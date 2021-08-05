// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Resolvers / Services
import { CustomersResolver } from './resolvers/customers.resolver';
import { CustomersService } from './services/customers.service';

// Schemas
import { CustomerSchema } from './schemas/customer.schema.db';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name:   'customers',
                schema: CustomerSchema,
            },
        ]),
    ],
    providers: [CustomersResolver, CustomersService],
    exports:   [CustomersService],
})
export class CustomersModule {}
