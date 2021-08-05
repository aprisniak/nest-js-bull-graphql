import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisClient, RedisClientError } from './redis-client.provider';

@Injectable()
export class RedisService {
    constructor(
        @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
        // eslint-disable-next-line no-empty-function
    ) {}

    getClient(name?: string): Redis {
        if (!name) {
            // eslint-disable-next-line no-param-reassign
            name = this.redisClient.defaultKey;
        }
        if (!this.redisClient.clients.has(name)) {
            throw new RedisClientError(`client ${name} does not exist`);
        }

        return this.redisClient.clients.get(name);
    }

    getClients(): Map<string, Redis> {
        return this.redisClient.clients;
    }
}
