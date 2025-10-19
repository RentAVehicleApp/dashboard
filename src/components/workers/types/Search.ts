export interface SearchCriteria {
    filter: string;
    operation: "EQUALS" | "LIKE" | "STARTS_WITH" | "ENDS_WITH";
    value: string;
}

export interface GenericSearchRequest {
    searchCriteriaList: SearchCriteria[];
    page?: number;
    size?: number;
    sort?: string;
}

export interface CustomPage<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}
