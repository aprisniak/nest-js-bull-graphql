import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IHealthModel } from '../interfaces';

@Injectable()
export class HealthService {
    // eslint-disable-next-line no-empty-function
    constructor(@InjectModel('Health') private readonly healthModel: Model<IHealthModel>) {}

    async create(): Promise<string> {
        const { _id } = await this.healthModel.create({
            data: `created-${Date.now()}`,
        });

        return _id.toString();
    }

    // eslint-disable-next-line consistent-return
    async read(id: string): Promise<string> {
        const source = await this.healthModel.findById(id).lean();

        if (!source) {
            return '';
        }

        const { _id } = source;

        return _id.toString();
    }

    async update(id: string): Promise<never | string> {
        const source = await this.healthModel
            .findByIdAndUpdate(id, { data: `modified-${Date.now()}` })
            .lean();

        if (!source) {
            throw new Error('failed update method in health check');
        }

        const { _id } = source;

        return _id.toString();
    }

    async remove(id: string): Promise<never | string> {
        const source = await this.healthModel.findByIdAndDelete(id).lean();

        if (!source) {
            throw new Error('failed remove method in health check');
        }

        const { _id } = source;

        return _id.toString();
    }
}
