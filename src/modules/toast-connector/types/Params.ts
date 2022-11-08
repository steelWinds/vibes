import type { SvelteToastOptions } from '@zerodevx/svelte-toast';

type SvelteToastOptionsOmit = Omit<SvelteToastOptions, 'theme'>;

interface IToastConnector extends SvelteToastOptionsOmit {
	title: string;
	limit?: boolean;
	intro?: SvelteToastOptions['intro'];
}

export type { IToastConnector };
