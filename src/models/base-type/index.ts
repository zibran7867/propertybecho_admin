import { ORDER_BY_ENUM } from "../../shared/constants/pagination";
import { ORDER_BY_TYPE } from "../../shared/constants/pagination";

export interface IBaseCreateRequest {
    createdBy?: number;
    created_at?: Date;
}

export interface IBaseUpdateRequest {
    updatedBy?: number;
    updated_at?: Date;
}

export interface IColumn {
    /* Column's name, as defined by columns.name. */
    name?: string;
    /* Column's data source, as defined by columns.data. */
    data?: string;
    /* Flag to indicate if this column is orderable (true) or not (false) */
    orderable?: boolean;
    /* Flag to indicate if this column is Searchable (true) or not (false) */
    searchable?: boolean;
    /* Specific search value. */
    search?: string;
    /* For Width of column */
    width?: number;
    /* For css of column */
    className?: string;
    datas?: string;
    dataset?: string;
}

export interface IOrder {
    column: number;
    dir: ORDER_BY_ENUM;
}

export interface SearchResult<T> {
    rows: T[];
    currentPage: number;
    total: number;
    totalPages: number;
}

export interface Pagination {
    sort?: ORDER_BY_TYPE;
    sort_by?: string;
    limit: number;
    page: number;
}
