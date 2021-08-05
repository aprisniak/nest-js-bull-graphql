import { Session } from 'express-session';
import { Employee } from '../graphql.schema';

export type PaginationType = { page: number, size: number };

export type ContextReqType = {
    sessionID: string;
    session: {
        id: string;
        cookie: {
            maxAge: number;
        };
        user: null | Employee;
        destroy(): void;
        save(func?: () => void): void;
        regenerate(func: (error: Error) => void): void;
    };
};

export type SessionRequestWithUser = Express.Request & {
    session: Session & { user: Employee };
    sessionID: string;
};
