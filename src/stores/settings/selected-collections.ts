import type { ICollectionData } from '@/types/API/Unsplash/DataTypes/ICollectionData';
import type { ObjectOption } from 'svelte-multiselect';

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable, get } from 'svelte/store';
import uniq from 'lodash-es/uniq';

const createSelectedCollectionsStore = <T>() => {
	const { subscribe, update, set } = persist(
		writable<Array<ObjectOption & ICollectionData>>([]),
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
