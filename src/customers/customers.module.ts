// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

// Resolvers, Services
import { CustomersResolver } from './resolvers/customers.resolver';
import { CustomersService } from './services/customers.service';
import { CustomersConsumer } from './consumers/create.consumer';

// Schemas
import { CustomerSchema } from './schemas/customer.schema.db';

// Other
import { customerCreateQueue } from '../constants/queueNames';

@Module({
    imports: [
        BullModule.registerQueue({
            name: customerCreateQueue,
        }),
        MongooseModule.forFeature([
            {
                name:   'customers',
                schema: CustomerSchema,
            },
        ]),
    ],
    providers: [CustomersResolver, CustomersService, CustomersConsumer],
    exports:   [CustomersService],
})
export class CustomersModule {}
