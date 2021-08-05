// Core
import { Queue } from 'bull';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import {
    Body, Logger, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

// Modules, Resolvers, Services
import { CustomersService } from '../services/customers.service';

// Guardian
import { GraphAuthGuard } from '../../internal/guards';
import { GqlBadRequestError } from '../../helpers/errors';

// Types
import { Customer, CustomerInput, PaginatedReturn } from '../../graphql.schema';
import { UserIp } from '../../internal/decorstors';

// Other
import { customerCreateQueue as customerCreateQueueName } from '../../constants/queueNames';

@Resolver()
export class CustomersResolver {
    private readonly logger = new Logger(CustomersResolver.name);

    constructor(
        private readonly customersService: CustomersService,
        @InjectQueue(customerCreateQueueName) private customerCreateQueue: Queue,
        // eslint-disable-next-line no-empty-function
    ) {}

    @Query()
    @UseGuards(GraphAuthGuard)
    async getCustomers(
        @Body('page', ParseIntPipe) page = 1,
        @Body('size', ParseIntPipe) size = 10,
    ): Promise<PaginatedReturn> {
        this.logger.verbose('GQL Query: [getCustomers]');

        if (size > 50) {
            throw new UserInputError('page size can not be grater than 50');
        }

        try {
            const data = await this.customersService.getCustomers({ page, size });

            return data;
        } catch ({ name, message }) {
            this.logger.error(`${name} ${message}`);
            throw new GqlBadRequestError(message);
        }
    }

    @Mutation()
    async createCustomer(
        @UserIp() ip: string,
            @Body('customer') customer: CustomerInput,
    ): Promise<Customer> {
        try {
            this.logger.verbose('GQL Mutation: [createCustomer]');

            await this.customerCreateQueue.add({ ...customer, ip });

            const { name, email } = customer;

            return { name, email, created: new Date() };
        } catch ({ name, message }) {
            this.logger.error(`${name} ${message}`);
            throw new GqlBadRequestError(message);
        }
    }
}
