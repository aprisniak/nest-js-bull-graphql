// Core
import { DynamicModule } from '@nestjs/common';

// Modules, Resolvers, Services
import { RedisModule, RedisModuleOptions } from './module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

// Interfaces, Types
import { IRedisOptions } from './interfaces/redis.interface';

export const redisProviders: [DynamicModule] = [
    RedisModule.forRootAsync({
        imports:    [ConfigModule],
        inject:     [ConfigService],
        useFactory: (configService: ConfigService): RedisModuleOptions => {
            const options: IRedisOptions = {
                host:     configService.get('REDIS_HOST'),
                password: configService.get('DB_REDIS_PASS'),
                port:     parseInt(configService.get('REDIS_PORT'), 10),
            };

            return options;
        },
    }),
];
