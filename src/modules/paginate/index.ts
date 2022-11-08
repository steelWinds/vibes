import type { IPaginationParams } from './types/Params';
import type { ReturnHandlerType, FetchCallbackType } from './types/Types';

const paginate = (props: IPaginationParams, callback: FetchCallbackType) => {
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
