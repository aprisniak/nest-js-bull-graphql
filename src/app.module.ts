// Core
import { Module } from '@nestjs/common';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { GraphQLModule } from '@nestjs/graphql';
import ConnectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { Request, Response } from 'express';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Modules
import { ConfigModule } from './internal/config/config.module';
import { DatabaseModule } from './internal/database/database.module';
import { HealthModule } from './internal/health/health.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';

// Services
import { ConfigService } from './internal/config/config.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'views'),
            exclude:  ['/api*', '/graphql'],
        }),
        ConfigModule,
        DatabaseModule,
        HealthModule,
        AuthModule,
        CustomersModule,
        BullModule.forRootAsync({
            imports:    [ConfigModule],
            inject:     [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    prefix:  'queue',
                    limiter: {
                        max:      10,
                        duration: 2000,
                    },
                    defaultJobOptions: {
                        attempts:         10,
                        removeOnComplete: true,
                        backoff:          3000,
                    },
                    redis: {
                        host:     config.get('REDIS_HOST'),
                        port:     Number(config.get('REDIS_PORT')),
                        password: config.get('DB_REDIS_PASS'),
                    },
                };
            },
        }),
        SessionModule.forRootAsync({
            imports:    [ConfigModule],
            inject:     [ConfigService],
            useFactory: (config: ConfigService): NestSessionOptions => {
                const RedisStore = ConnectRedis(session);

                const sessionOptions = {
                    // eslint-disable-next-line no-restricted-globals
                    name:   'user',
                    secret: config.get('SESSION_PASSWORD'),
                    store:  new RedisStore({
                        client: new Redis({
                            port:     Number(config.get('REDIS_PORT')),
                            host:     config.get('REDIS_HOST'),
                            password: config.get('DB_REDIS_PASS'),
                        }),
                    }),
                    resave:            false,
                    rolling:           true,
                    saveUninitialized: false,
                    cookie:            {
                        httpOnly: true,
                        maxAge:   process.env.NODE_ENV === 'production' ? 7200000 : 57600000,
                        secure:   process.env.NODE_ENV === 'production',
                        domain:   process.env.NODE_ENV === 'production' ? '.lectrum.io' : '',
                        sameSite: false,
                    },
                };

                return {
                    session: sessionOptions,
                };
            },
        }),
        GraphQLModule.forRootAsync({
            useFactory: () => {
                let options = {
                    typePaths: ['./**/*.graphql'],
                    debug:     false,
                    context:   ({
                        req,
                        res,
                    }: {
                        req: Request;
                        res: Response;
                    }): { req: Request; res: Response } => ({ req, res }),
                    cors: {
                        credentials: true,
                        origin:      true,
                    },
                };

                if (process.env.GRAPH_MODE === 'DEV') {
                    options = {
                        ...options,
                        ...{
                            introspection: true,
                            playground:    true,
                        },
                    };
                }

                return options;
            },
        }),
    ],
    providers: [],
})
export class AppModule {}
