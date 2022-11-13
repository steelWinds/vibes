import type { FetchOptions } from 'ohmyfetch';
import type { FetchDataType } from './types/Types';

import { $fetch as ohmyfetch } from 'ohmyfetch';
import modalConnectorStore from '@/stores/modules/modal-connector';

const useFetch = async <T>(
	URI: string,
	options?: FetchOptions
): Promise<FetchDataType<T>> => {
	const request = ohmyfetch.raw(URI, {
		baseURL: import.meta.env.VITE_API_BASE_URL,
		headers: {
			Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_TOKEN}`
		},
		onRequestError: ({ request, error }) => {
			modalConnectorStore.openModal(request.toString(), {
				modalHeading: `Network Error: ${error.message}`,
				content: 'Try later again',
				modalClass: 'no-footer auto-size error',
				passiveModal: true
			});
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
