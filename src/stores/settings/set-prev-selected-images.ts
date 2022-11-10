import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const setPrevSelectedImages = persist(
	writable(true),
	createLocalStorage(),
	'set-prev-selected-images'
);

export default setPrevSelectedImages;
