export interface ICustomerCreate {
    name: {
        first: string;
        last?: string;
    }
    email: string;
    phone: string;
    password: string;
    ip?: string;
}
