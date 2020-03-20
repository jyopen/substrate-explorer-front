export interface TableOptions<M> {
    label: string;
    width?: string;
    type?: ViewTypes;
    getValue?: (row: M) => string;
    getType?: (row: M) => ViewTypes;
    getPath?: (row: M) => string;
    prop: string;
}

export interface RequestOptions {
    order?: string[][];
    where?: object;
}

export type TableFilterOptions = {
    pageSize: number,
    currentPage: number,
} & RequestOptions;

export type ListRequestOptions = {
    limit?: number,
    offset?: number,
} & RequestOptions;

export interface ListResponseType<M> {
    count: number;
    rows: M[];
}

export interface TabOptions {
    label: string;
    name: string;
}

export enum ViewTypes {
    FRIENDLY_TIME = 'FRIENDLY_TIME',
    TIME = 'TIME',
    LINK = 'LINK',
    BALANCE = 'BALANCE',
}
