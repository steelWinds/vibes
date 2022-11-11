import type { IColorDepthParams } from './types/Params';

import buildRGB from './buildRGB';
import quantization from './quantization';

const getDiscreteRGBSet = (
	imageData: ImageData,
	colorDepth: IColorDepthParams
) => {
	const RGBValues = buildRGB(imageData?.data);
	const RGBSet = quantization({ RGBValues, colorDepth });

	return RGBSet;
};

export default getDiscreteRGBSet;
