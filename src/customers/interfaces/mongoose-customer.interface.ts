// Core
import { Document } from 'mongoose';

// Types
import { PaginatedReturn } from '../../graphql.schema';

export interface ICustomersModel extends Document, PaginatedReturn {
    hash: string;
    name: {
        first: string;
        last: string;
    }
    email: string;
    password: string;
    created: string;
}
