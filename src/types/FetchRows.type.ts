export type Request = {
  page: number;
  pageSize: number;
  order?: string;
  orderBy?: string;
  search?: string;
  filters?: Record<string, string>;
};

export type PaginatedResponse<T> = {
  items: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
};

export type FetchRows<T> = (queryParams: Request) => Promise<PaginatedResponse<T>>;
