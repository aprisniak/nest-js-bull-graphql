// Core
import { ApolloError } from 'apollo-server-express';

export class GqlBadRequestError extends ApolloError {
    constructor(message: string) {
        super(message, 'BAD_REQUEST');

        Object.defineProperty(this, 'name', { value: 'GqlBadRequestError' });
    }
}
