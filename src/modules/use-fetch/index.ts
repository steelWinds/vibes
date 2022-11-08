import type { FetchOptions } from 'ohmyfetch';
import type { FetchDataType } from './types/Types';

import { $fetch as ohmyfetch } from 'ohmyfetch';

const useFetch = async <T>(
	URI: string,
	options?: FetchOptions
): Promise<FetchDataType<T>> => {
	const request = ohmyfetch.raw(URI, {
		baseURL: import.meta.env.VITE_API_BASE_URL,
		headers: {
			Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_TOKEN}`
		},
		...options
	});

	const result = await request;
	const data: T = await result._data;

	return {
		data,
		headers: result.headers
	};
};

export default useFetch;
