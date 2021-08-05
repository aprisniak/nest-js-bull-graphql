
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Credentials {
    email: string;
    password: string;
}

export interface CustomerInput {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface Name {
    first: string;
    last?: Nullable<string>;
}

export interface Employee {
    name: Name;
    hash: string;
}

export interface IMutation {
    login(credentials: Credentials): Employee | Promise<Employee>;
    logout(): Employee | Promise<Employee>;
    createCustomer(customer: CustomerInput): Customer | Promise<Customer>;
}

export interface CustomerName {
    first: string;
    last?: Nullable<string>;
}

export interface Customer {
    name: string;
    email: string;
    created: DateTime;
}

export interface PaginatedReturn {
    docs: Customer[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}

export interface IQuery {
    getCustomers(page: number, size: number): PaginatedReturn | Promise<PaginatedReturn>;
}

export type DateTime = any;
type Nullable<T> = T | null;
