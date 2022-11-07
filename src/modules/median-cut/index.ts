import type { IMedianCutParams } from './types/Params';

import buildRGB from './buildRGB';
import extractImage from './extractImage';
import quantization from './quantization';
import getColorWithType from './getColorWithType';

const median = async (props: IMedianCutParams) => {
	const { image, canvas, colorDepth } = props;

	if (!image || !canvas) return;

	const imageData = await extractImage(props);
	const RGBPallete = buildRGB(imageData?.data);
	const color = quantization(
		RGBPallete,
		colorDepth?.depth,
		colorDepth?.maxDepth
	);

	return color;
};

export { buildRGB, extractImage, median, getColorWithType };
