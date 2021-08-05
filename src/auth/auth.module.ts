// Core
import { Module } from '@nestjs/common';

// Modules, Resolvers, Services
import { RedisModule } from '../internal/redis/redis.module';
import { CustomersModule } from '../customers/customers.module';

// Resolvers
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
    imports:   [CustomersModule, RedisModule],
    providers: [AuthResolver],
})
export class AuthModule {}
