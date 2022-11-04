import type { ImageData } from '@/types/API/DataTypes/ImageData';

import useFetch from '@/modules/use-fetch';

interface GetRandomImagesQuery {
	collections: string;
	count: number;
}

const getRandomImages = async (query: GetRandomImagesQuery) => {
	const { data } = await useFetch<ImageData[]>('/photos/random', {
		query
	});

	return data;
};

export default getRandomImages;
