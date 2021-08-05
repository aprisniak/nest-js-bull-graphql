import {
    Args, Context, Mutation, Resolver,
} from '@nestjs/graphql';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { Logger, UseGuards } from '@nestjs/common';

// Modules, Resolvers, Services
import { CustomersService } from '../../customers/services/customers.service';
import { CacheService } from '../../internal/redis/services/redis.service';

// Guards
import { GraphAuthGuard } from '../../internal/guards';

// Interfaces, Types
import { ContextReqType } from '../../types';
import {
    Credentials, Employee,
} from '../../graphql.schema';

@Resolver('Auth')
export class AuthResolver {
    private readonly logger = new Logger(AuthResolver.name);

    constructor(
        private readonly customersService: CustomersService,
        private readonly redisService: CacheService,
        // eslint-disable-next-line no-empty-function
    ) {}

    @Mutation()
    async login(
        @Context()
            context: {
                req: ContextReqType;
            },
            @Args('credentials') credentials: Credentials,
    ): Promise<Employee> {
        try {
            const { req: { session } } = context;
            const customer = await this.customersService.login(credentials);
            const { hash, name } = customer;

            session.user = { hash, name };

            this.logger.verbose('GQL Query: [login]');

            return {
                hash,
                name,
            };
        } catch ({ name, message }) {
            throw new ValidationError(message);
        }
    }

    @Mutation()
    @UseGuards(GraphAuthGuard)
    logout(
        @Context() context: { req: ContextReqType },
    ): Employee | null {
        try {
            const { req } = context;
            const { user } = req.session;

            if (req.session && !req.session.user) {
                throw new AuthenticationError('credentials not valid');
            }

            if (typeof req.session === 'object') {
                req.session.cookie.maxAge = 0;
                setImmediate(() => {
                    req.session.destroy();
                });
            }

            this.logger.verbose('GQL Query: [logout]');

            return user;
        } catch ({ name, message }) {
            throw new ValidationError(message);
        }
    }
}
