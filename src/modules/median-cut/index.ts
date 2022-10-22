import type { ColorDepth } from './types/ColorDepth.type';

import buildRGB from './buildRGB';
import extractImage from './extractImage';
import quantization from './quantization';

const median = (
	image?: HTMLImageElement,
	canvas?: HTMLCanvasElement,
	colorOptions?: ColorDepth
) => {
	if (!image || !canvas) return;

	const imageData = extractImage(image, canvas);
	const RGBPallete = buildRGB(imageData?.data);
	const color = quantization(RGBPallete, colorOptions?.depth, colorOptions?.maxDepth);

	return color;
};

export { buildRGB, extractImage, median };
