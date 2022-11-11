import type { OutputColorType } from '@/configs/colors-output-type';

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const outputColorType = persist(
	writable<OutputColorType>('hex'),
	createLocalStorage(),
	'output-color-type'
);

export default outputColorType;
