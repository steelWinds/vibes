import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

import {
	persist,
	createIndexedDBStorage
} from '@macfja/svelte-persistent-store';
import sourceTypeStore from '@/stores/settings/source-type';
import { writable } from 'svelte/store';

const createSourceTypeStore = () => {
	const { subscribe, update, set } = persist(
		writable<Map<string | number, IImageData | string>>(new Map()),
		createIndexedDBStorage(),
		'source-type-stack'
	);

	const deleteURI = (id: string) => {
		update((store) => {
			store.delete(id);

			if (!store.size) {
				sourceTypeStore.update(() => 'started');
			}

			return store;
		});
	};

	const addURI = (image: IImageData | string) => {
		update((store) => {
			const key = typeof image === 'object' ? image.id : image;

			if (store.has(key)) {
				deleteURI(key);
			} else {
				const setItem = [key, image];
				const prevStack = store.entries();
				const newStack = [setItem, ...prevStack] as
					| Iterable<readonly [string | number, string | IImageData]>
					| null
					| undefined;

				store = new Map(newStack);
			}

			return store;
		});
	};

	const clear = () => {
		update((store) => {
			store.clear();

			sourceTypeStore.update(() => 'started');

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

const sourceTypeStackStore = createSourceTypeStore();

export default sourceTypeStackStore;
