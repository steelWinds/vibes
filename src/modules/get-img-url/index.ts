import type { ICompressionParams } from './types/CompressionParams';

import compression from './compression';

const getImgURL = async (
	options: ICompressionParams,
	...args: File[]
): Promise<string[]> => {
	const images = Array.from(args).filter((file) => file.size);

	const compressedImages = await compression(images, options);

	const promises: Promise<string>[] = compressedImages.map((image) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (!reader.result) {
					return reject();
				}

				resolve(reader.result as string);
			};

			reader.readAsDataURL(image);
		});
	});

	const result = await Promise.allSettled(promises);

	return result
		.filter((promise) => promise.status === 'fulfilled')
		.map((promise) => (promise as PromiseFulfilledResult<string>).value);
};

export default getImgURL;
