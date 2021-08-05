import {
    Injectable, CanActivate, ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class GraphAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context).getContext();

        if (ctx.req && !ctx.req.session) {
            throw new AuthenticationError('credentials not valid');
        }

        if (ctx.req.session && !ctx.req.session.user) {
            throw new AuthenticationError('credentials not valid');
        }

        const { user } = ctx.req.session;

        if (user.hash) {
            return true;
        }

        throw new AuthenticationError('credentials not valid');
    }
}
