// Core
import { ApolloError } from 'apollo-server-express';

export class GqlUnauthorizedException extends ApolloError {
    constructor(message: string) {
        super(message, 'UNAUTHORIZED');

        Object.defineProperty(this, 'name', { value: 'GqlUnauthorizedException' });
    }
}
