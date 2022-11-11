import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const swiperControlsVisibleStore = persist(
	writable(true),
	createLocalStorage(),
	'swiper-controls-visible'
);

export default swiperControlsVisibleStore;
