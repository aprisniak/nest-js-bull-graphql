
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
    last: string;
}

export interface Locales {
    en: Name;
    ru: Name;
}

export interface Employee {
    name: Locales;
    hash: string;
}

export interface IMutation {
    login(credentials: Credentials): Employee | Promise<Employee>;
    logout(): Employee | Promise<Employee>;
    createCustomer(customer: CustomerInput): Customer | Promise<Customer>;
}

export interface CustomerEmail {
    email: string;
}

export interface CustomerPhone {
    phone: string;
}

export interface CustomerName {
    first: string;
    last?: Nullable<string>;
}

export interface CustomerNameLocales {
    ru: CustomerName;
    en?: Nullable<CustomerName>;
}

export interface Customer {
    hash: string;
    name: string;
    email: string;
    phone: string;
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
    getCustomers(page?: Nullable<number>, size?: Nullable<number>): PaginatedReturn | Promise<PaginatedReturn>;
}

export type DateTime = any;
type Nullable<T> = T | null;
