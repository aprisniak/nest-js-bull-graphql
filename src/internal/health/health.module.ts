import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './controller/health.controller';
import { HealthService } from './services/health.service';
import { HealthSchema } from './schemas/health.schema.db';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name:   'Health',
                schema: HealthSchema,
            },
        ]),
    ],
    controllers: [HealthController],
    providers:   [HealthService],
    exports:     [HealthService],
})
export class HealthModule {}
