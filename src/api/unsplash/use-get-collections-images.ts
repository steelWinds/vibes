import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';
import type { ICollectionData } from '@/types/API/Unsplash/DataTypes/ICollectionData';
import type { IPaginationQueryProps } from '@/types/API/Unsplash/Pagination';

import cloneDeep from 'lodash-es/cloneDeep';
import shuffle from 'lodash-es/shuffle';
import paginate from '@/modules/paginate';

interface IGetCollectionsImagesParams extends IPaginationQueryProps {
	id: ICollectionData['id'];
}

const useGetCollectionsImages = (
	collections: ICollectionData[],
	props: IPaginationQueryProps
) => {
	const paginates = collections.map((collection) =>
		paginate<IGetCollectionsImagesParams, IImageData[]>(
			`/collections/${collection.id}/photos`,
			cloneDeep(Object.assign(props, { id: collection.id }))
		)
	);

	const handler = async (perPage: number) => {
		const promises = paginates.map((paginate) => paginate(perPage));

		const images = (await Promise.allSettled(promises))
			.filter((promise) => promise.status === 'fulfilled')
			.map((promise) => (promise as PromiseFulfilledResult<IImageData[]>).value)
			.flat();

		return shuffle(images);
	};

	return handler;
};

export default useGetCollectionsImages;
