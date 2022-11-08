import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type SourceType = 'uploading' | 'started' | 'internet';

interface SourceTypeProps {
	sourcesStack: Set<string>;
	type: SourceType;
}

const createSourceTypeStore = () => {
	const { subscribe, update, set } = persist(
		writable<SourceTypeProps>({
			sourcesStack: new Set(),
			type: 'started'
		}),
		createLocalStorage(),
		'source-type'
	);

	const deleteURI = (URI: string) => {
		update((store) => {
			store.sourcesStack.delete(URI);

			return store;
		});
	};

	const addURI = (URI: string) => {
		update((store) => {
			store.sourcesStack.add(URI);

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
