import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const databaseProviders: [DynamicModule] = [
    MongooseModule.forRootAsync({
        imports:    [ConfigModule],
        inject:     [ConfigService],
        useFactory: (config: ConfigService): MongooseModuleOptions => {
            const options = {
                uri:                config.get('MONGODB_URI'),
                poolSize:           10,
                connectTimeoutMS:   5000,
                useNewUrlParser:    true,
                useFindAndModify:   false,
                useCreateIndex:     true,
                useUnifiedTopology: true,
            };

            return options;
        },
    }),
];
