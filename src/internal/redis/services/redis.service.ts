import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from '../module';

@Injectable()
export class CacheService {
    private readonly redis: Redis;

    constructor(private readonly redisService: RedisService) {
        this.redis = this.redisService.getClient();
    }

    async get(key: string): Promise<unknown> {
        const source = await this.redis.get(key);

        if (typeof source !== 'string') {
            return null;
        }

        const data = JSON.parse(source);

        return data;
    }

    async set(key: string, data: unknown): Promise<boolean> {
        await this.redis.set(key, JSON.stringify(data));

        return true;
    }

    async setEx(key: string, data: unknown | string, ex: number): Promise<boolean> {
        await this.redis.set(key, JSON.stringify(data), 'ex', ex);

        return true;
    }

    async del(key: string): Promise<boolean> {
        const source = await this.redis.del(key);

        return Boolean(source);
    }
}
