import * as mongoose from 'mongoose';

export const HealthSchema: mongoose.Schema = new mongoose.Schema(
    {
        data: {
            type:     String,
            required: true,
            unique:   true,
        },
    },
    {
        timestamps: { createdAt: 'created', updatedAt: 'modified' },
    },
);
