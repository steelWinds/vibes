import type { IUnsplashQualities } from '@/types/API/Unsplash/DataTypes/IUnsplashQualities'

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const unsplashImageQualityStore = persist(
	writable<IUnsplashQualities>('regular'),
	createLocalStorage(),
	'unsplash-image-quality'
);

export default unsplashImageQualityStore;
