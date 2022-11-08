import type { IPaginationQueryProps } from '@/types/API/Unsplash/Pagination';

type ReturnHandlerType<T> = {
	data?: T;
	nextPaginate: boolean;
};

type FetchCallbackType = <R>(props: IPaginationQueryProps) => Promise<R>;

export type { ReturnHandlerType, FetchCallbackType };
