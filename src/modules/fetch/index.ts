import type { FetchOptions } from 'ohmyfetch';

import { $fetch as ohmyfetch } from 'ohmyfetch';

const _fetch = async <T>(URI: string, options?: FetchOptions): Promise<T> => {
	return await ohmyfetch(URI, {
		baseURL: import.meta.env.VITE_API_BASE_URL,
		headers: {
			Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_TOKEN}`
		},
		...options
	});
};

export { _fetch };
