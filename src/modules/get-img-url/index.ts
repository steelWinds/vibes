import type { URLData } from './types/URLData.type';
import type { CompressionOptions } from './types/CompressionOptions.type';

import compression from './compression';

const getImgURL = async (options: CompressionOptions, ...args: File[]): Promise<URLData[]> => {
	const images = Array.from(args).filter((file) => file.size);

	const compressedImages = await compression(images, options);

	const promises: Promise<URLData>[] = compressedImages.map((image) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (!reader.result) {
					return reject();
				}

				resolve({
					url: reader.result as string
				});
			};

			reader.readAsDataURL(image);
		});
	});

	const result = await Promise.allSettled(promises);

	return result
		.filter((promise) => promise.status === 'fulfilled')
		.map((promise) => (promise as PromiseFulfilledResult<URLData>).value);
};

export default getImgURL;
