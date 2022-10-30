import type { SvelteToastOptions } from '@zerodevx/svelte-toast';

const config = (duration: number): SvelteToastOptions => {
	return {
		duration,
		intro: {
			y: 100
		},
		reversed: true
	};
};

export default config;
