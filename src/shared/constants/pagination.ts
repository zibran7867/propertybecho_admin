import { SortDescriptor } from "@heroui/react";
import { Pagination } from "../../models/base-type";
import { Digits } from "../enums/digits";


export const ORDER_BY_ASC = 'ascending';
export const ORDER_BY_DESC = 'descending';
export type ORDER_BY_TYPE = 'ascending' | 'descending';
export enum ORDER_BY_ENUM {
    asc,
    desc,
}

export enum Sorting {
    ascending = 'asc',
    descending = 'desc',
}

export const DEFAULT_ORDERBY = 'created_at';
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_OPTIONS = [10, 50, 100, 200, 500, 1000];

export const PAGINATION: Pagination = {
    page: Digits.One,
    limit: DEFAULT_PAGE_SIZE,
};

export const SORTING: SortDescriptor = {
    column: DEFAULT_ORDERBY,
    direction: ORDER_BY_DESC,
};
