const prefix = process.env.NODE_ENV === 'development';

export const customerCreateQueue = `${prefix}-customers-create`;
