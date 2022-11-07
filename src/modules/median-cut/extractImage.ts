import type { IExtractCanvasParams } from './types/Params';

import { lazyLoad } from '@/modules/lazy-load-skeleton';

const extractImage = async (
	props: IExtractCanvasParams
): Promise<ImageData | null> => {
	const { image, canvas, sizes } = props;

	image.setAttribute('crossOrigin', 'anonymous');

	const inlineSize = sizes?.inline ?? image.naturalWidth ?? image.width;
	const blockSize = sizes?.block ?? image.naturalHeight ?? image.height;

	canvas.width = inlineSize;
	canvas.height = blockSize;

	const source = image.getAttribute('src') ?? '';

	const loadedImage = await lazyLoad(source);

	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	ctx.drawImage(
		loadedImage,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight,
		0,
		0,
		inlineSize,
		blockSize
	);

	return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

export default extractImage;
