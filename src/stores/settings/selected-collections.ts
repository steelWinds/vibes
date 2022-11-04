import type { CollectionData } from '@/types/API/DataTypes/CollectionData';

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable, get } from 'svelte/store';
import uniq from 'lodash-es/uniq';

const createSelectedCollectionsStore = () => {
	const { subscribe, update, set } = persist(
		writable<CollectionData[]>([]),
		createLocalStorage(),
		'selected-collections'
	);

	const getIdx = () => {
		return uniq(get({ subscribe }).map((collection) => collection.id));
	};

	return {
		subscribe,
		update,
		getIdx,
		set
	};
};

const selectedCollectionsStore = createSelectedCollectionsStore();

export default selectedCollectionsStore;
