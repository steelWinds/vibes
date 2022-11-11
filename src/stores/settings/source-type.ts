import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type SourceType = 'uploading' | 'started' | 'internet';

const sourceTypeStore = persist(
	writable<SourceType>('started'),
	createLocalStorage(),
	'source-type'
);

export default sourceTypeStore;
