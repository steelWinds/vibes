import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type SourceType = 'uploading' | 'started' | 'internet';

interface SourceTypeStoreType {
	sourcesStack: Set<string>;
	type: SourceType;
}

const createSourceTypeStore = () => {
  const { subscribe, update, set } = persist(
    writable<SourceTypeStoreType>({
      sourcesStack: new Set(),
      type: 'started'
    }),
    createLocalStorage(),
    'source-type'
  );

  const deleteURI = (URI: string) => {
    update(store => {
      store.sourcesStack.delete(URI);

      return store
    })
  }

  const addURI = (URI: string) => {
    update(store => {
      store.sourcesStack.add(URI);

      return store
    })
  }
  
  return {
    subscribe,
    update,
    set,
    deleteURI,
    addURI,
  }
}

const sourceTypeStore = createSourceTypeStore()

export default sourceTypeStore;
