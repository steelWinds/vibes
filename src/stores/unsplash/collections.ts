import type { CollectionData } from '@/types/API/CollectionData';
import type { PaginationQuery } from '@/types/API/PaginationQuery';

import { writable } from 'svelte/store';
import { _fetch } from '@/modules/fetch';

const createUnsplashCollectionsStore = () => {
	const { subscribe, update } = writable<CollectionData[]>([]);

	const getCollections = async (props: PaginationQuery) => {
		const response = await _fetch<CollectionData[]>('/search/collections', {
			query: props
		});

		update(() => {
			return [...response.filter((item) => item.private)];
		});
	};

	return {
		subscribe,
		getCollections
	};
};

const unsplashCollectionStore = createUnsplashCollectionsStore();

export default unsplashCollectionStore;
