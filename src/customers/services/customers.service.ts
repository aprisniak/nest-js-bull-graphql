// Core
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interfaces, Types
import { ICustomersModel } from '../interfaces';
import { PaginationType } from '../../types';
import { Credentials, CustomerInput, PaginatedReturn } from '../../graphql.schema';
import { ICustomerCreate } from '../types';

@Injectable()
export class CustomersService {
    private readonly logger = new Logger(CustomersService.name);

    constructor(
        @InjectModel('customers')
        private readonly customerModel: PaginateModel<ICustomersModel>, // eslint-disable-next-line no-empty-function
    ) {}

    async createCustomer(body: CustomerInput & { ip?: string }): Promise<any> {
        const {
            name, email, phone, password, ip,
        } = body;
        const [first, last] = name.split(/\s+/);
        const hashedPassword = await bcrypt.hash(password, 11);

        const customer: ICustomerCreate = {
            name: {
                first,
                last,
            },
            email,
            phone,
            password: hashedPassword,
            ip,
        };

        const resource = await this.customerModel.create(customer);

        this.logger.verbose('Service: [createCustomer]');

        return resource;
    }

    async getCustomers({ page: docPage, size }: PaginationType): Promise<PaginatedReturn> {
        const users = await this.customerModel.paginate(
            {},
            {
                select:     '-_id name email phone hash created',
                page:       Number(docPage),
                limit:      Number(size),
                leanWithId: false,
                lean:       true,
                sort:       { created: -1 },
            },
        );

        const {
            docs,
            totalDocs,
            limit,
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = users;

        this.logger.verbose('Service: [getCustomers]');

        return {
            // TODO; fix it
            // @ts-ignore
            docs:        docs.map((item) => ({ ...item, name: `${item.name.first} ${item.name.first}` })),
            totalDocs,
            limit,
            totalPages,
            page:        page || 1,
            pagingCounter,
            hasPrevPage: Boolean(hasPrevPage),
            hasNextPage: Boolean(hasNextPage),
            prevPage:    prevPage || 1,
            nextPage:    nextPage || 1,
        };
    }

    // TODO; fix any
    async login(credentials: Credentials): Promise<any> {
        const { email, password } = credentials;

        const source = await this.customerModel
            .findOne({ email })
            .select('_id password hash name email created ')
            .lean();

        if (!source) {
            this.logger.error(`customer with email ${email} not found or has been blocked`);

            throw new ApolloError('credentials not valid');
        }

        const {
            _id: id, password: hashedPassword, name, hash,
        } = source;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
            this.logger.error(`customer with email ${email} provided wrong password`);

            throw new AuthenticationError('credentials not valid');
        }

        return {
            id,
            name,
            hash,
        };
    }
}
