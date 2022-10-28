import imageCompression from 'browser-image-compression';

type Options = Parameters<typeof imageCompression>[1];

const defaultOptions: Options = {
	maxSizeMB: 0.9,
	maxWidthOrHeight: 1920,
	useWebWorker: true
};

const compression = async (images: File[], options = defaultOptions): Promise<File[]> => {
	const promises = images.map((image) => imageCompression(image, options));

	const results = (await Promise.allSettled(promises))
		.filter((result) => result.status === 'fulfilled')
		.map((result) => (result as PromiseFulfilledResult<File>).value);

	return results;
};

export default compression;
