interface IPaginationQueryProps {
	ids?: string | string[];
	query?: string;
	per_page?: number;
	page?: number;
}

interface IPaginationObject<T extends { length: number }> {
	results: T;
	total: number;
	total_pages: number;
}

export type { IPaginationObject, IPaginationQueryProps };
