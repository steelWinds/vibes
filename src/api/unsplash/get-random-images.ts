import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

import useFetch from '@/modules/use-fetch';

interface GetRandomImagesParam {
	collections: string;
	count: number;
}

const getRandomImages = async (query: GetRandomImagesParam) => {
	const { data } = await useFetch<IImageData[]>('/photos/random', {
		query
	});

	return data;
};

export default getRandomImages;
