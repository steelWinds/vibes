interface PaginationQuery {
	ids?: string | string[];
	query?: string;
	per_page?: number;
	page?: number;
}

interface PaginationObject<T extends { length: number }> {
	results: T;
	total: number;
	total_pages: number;
}

export type { PaginationObject, PaginationQuery };