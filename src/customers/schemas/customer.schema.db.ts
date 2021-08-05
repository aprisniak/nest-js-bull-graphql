import * as mongoose from 'mongoose';

// TODO; fix it
// Bug with package
// eslint-disable-next-line
const mongoosePaginate = require('mongoose-paginate-v2');

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
                type:     String,
                required: true,
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
    },
    {
        timestamps: { createdAt: 'created', updatedAt: 'modified' },
    },
);

CustomerSchema.plugin(mongoosePaginate);
