import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

import {
	persist,
	createIndexedDBStorage
} from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type SourceType = 'uploading' | 'started' | 'internet';

interface SourceTypeProps {
	sourcesStack: Map<string | number, IImageData | string>;
	type: SourceType;
}

const createSourceTypeStore = () => {
	const { subscribe, update, set } = persist(
		writable<SourceTypeProps>({
			sourcesStack: new Map(),
			type: 'started'
		}),
		createIndexedDBStorage(),
		'source-type'
	);

	const deleteURI = (id: string) => {
		update((store) => {
			store.sourcesStack.delete(id);

			if (!store.sourcesStack.size) {
				store.type = 'started';
			}

			return store;
		});
	};

	const addURI = (image: IImageData | string) => {
		update((store) => {
			const key = typeof image === 'object' ? image.id : image;

			if (store.sourcesStack.has(key)) {
				deleteURI(key);
			} else {
				store.sourcesStack.set(key, image);
			}

			return store;
		});
	};

	const clear = () => {
		update((store) => {
			store.sourcesStack.clear();
			store.type = 'started';

			return store;
		});
	};

	return {
		subscribe,
		update,
		set,
		deleteURI,
		addURI,
		clear
	};
};

const sourceTypeStore = createSourceTypeStore();

export default sourceTypeStore;
