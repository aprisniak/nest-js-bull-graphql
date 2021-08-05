// Core
import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

// Types
import { CustomersService } from '../services/customers.service';

// Other
import { customerCreateQueue } from '../../constants/queueNames';
import { CustomerInput } from '../../graphql.schema';

@Processor(customerCreateQueue)
export class CustomersConsumer {
    private readonly logger = new Logger(CustomersConsumer.name);

    constructor(
        private readonly customersService: CustomersService,
        // eslint-disable-next-line no-empty-function
    ) {}

    @Process()
    async transcode(job: Job<CustomerInput>) {
        this.logger.verbose('Query [createCustomer]');

        try {
            await this.customersService.createCustomer(job.data);
        } catch ({ message }) {
            this.logger.error(message);

            if (!message.includes('unique')) {
                await job.retry();
            }
        }
    }
}
