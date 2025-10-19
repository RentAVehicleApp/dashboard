export const Operations = {
    EQUALS: "EQUALS",
    LIKE: "LIKE",
    GREATER_THAN: "GREATER_THAN",
    LESS_THAN: "LESS_THAN",
    STARTS_WITH: "STARTS_WITH",
    END_WITH: "END_WITH",
} as const;

export type Operations = typeof Operations[keyof typeof Operations];




export interface SearchCriteria {
    filter: string;
    operation: Operations;
    value: string;
}

export interface SearchUserRequest {
    searchCriteria: SearchCriteria[];
    page: number;
    size: number;
    sort: string;
}
