// Core
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// Modules
import { AppModule } from './app.module';

// Other
import { HttpExceptionFilter } from './helpers/http-exception.filter';

const logger = new Logger('Main');

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // eslint-disable-next-line no-nested-ternary
        logger: process.env.GRAPH_MODE === 'DEV' || process.env.NODE_ENV === 'development'
            ? ['error', 'debug', 'log', 'verbose']
            : ['warn', 'error'],
    });

    // translate nest REST errors to GraphQL errors
    app.useGlobalFilters(new HttpExceptionFilter());
    app.disable('x-powered-by');
    app.set('trust proxy', process.env.NODE_ENV === 'production');

    app.enableCors({
        origin:      true,
        methods:     'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    let PORT = 3000;

    if (process.env.NODE_ENV === 'development') {
        PORT = 4000;
    }

    await app.listen(PORT);

    logger.log(`Server is up on port ${PORT}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
    try {
        await bootstrap();
    } catch ({ name, message }) {
        logger.error(`${name}: ${message}`);
    }
})();
