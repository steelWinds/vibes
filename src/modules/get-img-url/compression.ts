import type { CompressionOptions } from './types/CompressionOptions.type';

import imageCompression from 'browser-image-compression';

const defaultOptions: CompressionOptions = {
	maxSizeMB: 0.9,
	maxWidthOrHeight: 1920,
	useWebWorker: true
};

const compression = async (images: File[], options: CompressionOptions): Promise<File[]> => {
	const promises = images.map((image) =>
		imageCompression(image, Object.assign(defaultOptions, options))
	);

	const results = (await Promise.allSettled(promises))
		.filter((result) => result.status === 'fulfilled')
		.map((result) => (result as PromiseFulfilledResult<File>).value);

	return results;
};

export default compression;
