import type { CollectionData } from '@/types/API/DataTypes/CollectionData';
import type { PaginationQuery, PaginationObject } from '@/types/API/Pagination';

import useFetch from '@/modules/use-fetch';

type SearchCollectionsQuery = { query: string } & PaginationQuery;

const searchCollections = async (
	query: SearchCollectionsQuery
): Promise<PaginationObject<CollectionData[]>> => {
	const { data } = await useFetch<PaginationObject<CollectionData[]>>('/search/collections', {
		query
	});

	return data;
};

export default searchCollections;
