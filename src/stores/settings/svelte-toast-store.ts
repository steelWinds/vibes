import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const svelteToastStore = persist(writable(true), createLocalStorage(), 'svelte-toast');

export default svelteToastStore;
