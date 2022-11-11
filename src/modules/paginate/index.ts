import type { IPaginationQueryProps } from '@/types/API/Unsplash/Pagination';

import useFetch from '@/modules/use-fetch';

const paginate = <
	T extends IPaginationQueryProps,
	U extends { length: number }
>(
	URI: string,
	props: T
) => {
	let currentPage = props?.page ?? 0;

  const handler = async (perPage: number) => {
    console.log(currentPage)

		const { data } = await useFetch<U>(URI, {
			query: Object.assign(props, { page: currentPage++, per_page: perPage })
		});

		return data;
	};

	return handler;
};

export default paginate;
