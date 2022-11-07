import type { ICompressionParams } from './types/CompressionParams';

import imageCompression from 'browser-image-compression';

const defaultOptions: ICompressionParams = {
	maxSizeMB: 0.9,
	maxWidthOrHeight: 1920,
	useWebWorker: true
};

const compression = async (
	images: File[],
	options: ICompressionParams
): Promise<File[]> => {
	const promises = images.map((image) =>
		imageCompression(image, Object.assign(defaultOptions, options))
	);

	const results = (await Promise.allSettled(promises))
		.filter((result) => result.status === 'fulfilled')
		.map((result) => (result as PromiseFulfilledResult<File>).value);

	return results;
};

export default compression;
