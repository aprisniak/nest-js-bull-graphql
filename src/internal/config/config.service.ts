import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));

        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            DB_URL, DB_USER, DB_PASS, DB_PORT, DB_NAME,
        } = this.envConfig;

        this.envConfig.MONGODB_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}:${DB_PORT}/${DB_NAME}`;
    }

    get(key: string): string {
        return this.envConfig[ key ];
    }

    set(key: string, value: string): void {
        this.envConfig[ key ] = value;
    }
}
