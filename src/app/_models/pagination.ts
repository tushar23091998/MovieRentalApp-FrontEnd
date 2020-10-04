export interface Pagination {
itemsPerPage:number;
currentPage:number;
totalItems:number;
totalPages:number;
}

export class PaginatedResult<T>{
    result: T;
    pagination: Pagination;
}

