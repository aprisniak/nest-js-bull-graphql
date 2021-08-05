import {
    ExceptionFilter, Catch, HttpException, Logger, ArgumentsHost,
} from '@nestjs/common';
import { GqlBadRequestError, GqlForbiddenException, GqlUnauthorizedException } from './errors';

const logger = new Logger('http-exception.filter.ts');

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException & { httpError?: boolean }, host: ArgumentsHost) {
        logger.error(`${exception.name}: ${exception.message}`);

        if (exception.httpError && exception.getStatus) {
            const status = exception.getStatus();
            const responseJSON = exception.getResponse();
            const response = host.switchToHttp().getResponse();

            return response
                .status(status)
                .json(responseJSON);
        }

        if (!exception.getStatus) {
            throw exception;
        }

        const status = exception.getStatus();
        const { message } = exception;

        switch (status) {
            case 400:
                throw new GqlBadRequestError(message);
            case 401:
                throw new GqlUnauthorizedException(message);
            case 403:
                throw new GqlForbiddenException(message);
            default:
                throw new GqlBadRequestError(message);
        }
    }
}
