import type { ICollectionData } from '@/types/API/Unsplash/DataTypes/ICollectionData';
import type {
	IPaginationQueryProps,
	IPaginationObject
} from '@/types/API/Unsplash/Pagination';

import useFetch from '@/modules/use-fetch';

type SearchCollectionsParam = { query: string } & IPaginationQueryProps;

const searchCollections = async (
	query: SearchCollectionsParam
): Promise<IPaginationObject<ICollectionData[]>> => {
	const { data } = await useFetch<IPaginationObject<ICollectionData[]>>(
		'/search/collections',
		{
			query
		}
	);

	return data;
};

export default searchCollections;
