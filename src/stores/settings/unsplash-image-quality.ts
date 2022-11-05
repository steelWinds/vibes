import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type UnsplashQualities = 'raw' | 'full' | 'regular' | 'small';

const unsplashImageQualityStore = persist(
	writable<UnsplashQualities>('regular'),
	createLocalStorage(),
	'unsplash-image-quality'
);

export default unsplashImageQualityStore;
