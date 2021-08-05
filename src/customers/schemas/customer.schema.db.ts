import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate-v2';

export const CustomerSchema: mongoose.Schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            default:  (): string => String(Date.now()),
        },
        name: {
            first: {
                type:     String,
                required: true,
            },
            last: {
                type: String,
            },
        },
        email: {
            type:     String,
            required: true,
            unique:   true,
        },
        phone: {
            type:     String,
            required: true,
        },
        password: {
            type:     String,
            required: true,
        },
        ip: {
            type: String,
        },
    },
    {
        timestamps: { createdAt: 'created', updatedAt: 'modified' },
    },
);

CustomerSchema.plugin(mongoosePaginate);
CustomerSchema.plugin(uniqueValidator);
