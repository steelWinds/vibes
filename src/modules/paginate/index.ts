import type { PaginationQuery } from '@/types/API/Pagination/PaginationQuery';

type FetchCallbackType = <R>(props: PaginationQuery) => Promise<R>;
type ReturnHandlerType<T> = {
	data?: T;
	nextPaginate: boolean;
};

interface PaginationProps {
	totalPages: number;
	startPage: number;
	step: number;
}

const paginate = (props: PaginationProps, callback: FetchCallbackType) => {
	const { totalPages, startPage, step } = props;

	let currentPage = startPage;

	const handler = async <R>(
		query = '',
		perPage: number
	): Promise<ReturnHandlerType<R>> => {
		if (currentPage >= totalPages) {
			return {
				nextPaginate: false
			};
		}

		const result = await callback<R>({
			query,
			per_page: perPage,
			page: currentPage
		});

		currentPage += step;

		return {
			data: result,
			nextPaginate: true
		};
	};

	return handler;
};

export default paginate;
