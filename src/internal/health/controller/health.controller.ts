import {
    HttpCode,
    HttpStatus,
    Controller,
    Post,
    BadRequestException,
} from '@nestjs/common';
import { format } from 'date-fns';
import { HealthService } from '../services/health.service';

@Controller('ping')
export class HealthController {
    constructor(
        private readonly healthService: HealthService,
        // eslint-disable-next-line no-empty-function
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async health(): Promise<string> {
        const id0 = await this.healthService.create();
        const id1 = await this.healthService.read(id0);
        const id2 = await this.healthService.update(id1);
        const id3 = await this.healthService.remove(id2);
        const id4 = await this.healthService.read(id3);

        if (id4) {
            throw new BadRequestException(
                `health check failed at ${format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`,
            );
        }

        return 'ok';
    }
}
