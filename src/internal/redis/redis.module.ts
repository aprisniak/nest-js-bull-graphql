import { Module } from '@nestjs/common';
import { redisProviders } from './redis.providers';
import { CacheService } from './services/redis.service';

@Module({
    imports:   [...redisProviders],
    providers: [CacheService],
    exports:   [CacheService],
})
export class RedisModule {}
