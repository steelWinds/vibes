import type { URLData } from '@/modules/get-img-url/types/URLData.type';

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type SourceType = 'uploading' | 'started' | 'internet';

interface SourceTypeStoreType {
	sourcesStack: URLData[];
	type: SourceType;
}

const createSourceTypeStore = () => {
	const { subscribe, update, set } = persist(
		writable<SourceTypeStoreType>({
			sourcesStack: [],
			type: 'started'
		}),
		createLocalStorage(),
		'source-type'
	);

	return {
		subscribe,
		update,
		set
	};
};

const sourceTypeStore = createSourceTypeStore();

export default sourceTypeStore;
