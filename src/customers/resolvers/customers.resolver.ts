// Core
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import {
    Body, Logger, ParseIntPipe, UseGuards,
} from '@nestjs/common';

// Services
import { CustomersService } from '../services/customers.service';

// Types
import { CustomerInput, PaginatedReturn } from '../../graphql.schema';
import { UserIp } from '../../internal/decorstors';

// Guardian
import { GraphAuthGuard } from '../../internal/guards';
import { GqlBadRequestError } from '../../helpers/errors';

const logger = new Logger('CustomersResolver');

@Resolver()
export class CustomersResolver {
    constructor(
        private readonly customersService: CustomersService,
        // eslint-disable-next-line no-empty-function
    ) {}

    @Query()
    @UseGuards(GraphAuthGuard)
    async getCustomers(
        @Body('page', ParseIntPipe) page = 1,
        @Body('size', ParseIntPipe) size = 10,
    ): Promise<PaginatedReturn> {
        if (size > 50) {
            throw new UserInputError('page size can not be grater than 50');
        }

        try {
            const data = await this.customersService.getCustomers({ page, size });

            logger.verbose('GQL Query: [getCustomers]');

            return data;
        } catch ({ name, message }) {
            logger.error(`${name} ${message}`);
            throw new GqlBadRequestError(message);
        }
    }

    // TODO; fix any
    @Mutation()
    async createCustomer(
        @UserIp() ip: string,
            @Body('customer') customer: CustomerInput,
    ): Promise<any> {
        try {
            const data = await this.customersService.createCustomer(customer);

            logger.verbose('GQL Mutation: [createCustomer]');

            return data;
        } catch ({ name, message }) {
            logger.error(`${name} ${message}`);
            throw new GqlBadRequestError(message);
        }
    }
}
