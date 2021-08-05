// Core
import { ApolloError } from 'apollo-server-express';

export class GqlForbiddenException extends ApolloError {
    constructor(message: string) {
        super(message, 'FORBIDDEN');

        Object.defineProperty(this, 'name', { value: 'GqlForbiddenException' });
    }
}
