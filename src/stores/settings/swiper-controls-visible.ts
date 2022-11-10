import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const swiperControlsVisible = persist(
	writable(true),
	createLocalStorage(),
	'swiper-controls-visible'
);

export default swiperControlsVisible;
