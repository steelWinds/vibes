import type { ExtractCanvas } from './types/ExtractCanvas.type'
import type { ColorDepth } from './types/ColorDepth.type'

import buildRGB from './buildRGB';
import extractImage from './extractImage';
import quantization from './quantization';
import getColorWithType from './getColorWithType'

interface Props extends ExtractCanvas {
  colorDepth?: ColorDepth;
}

const median = (props: Props) => {
  const { image, canvas, colorDepth } = props

	if (!image || !canvas) return;

	const imageData = extractImage({ image, canvas });
	const RGBPallete = buildRGB(imageData?.data);
	const color = quantization(RGBPallete, colorDepth?.depth, colorDepth?.maxDepth);

	return color;
};

export {
  buildRGB,
  extractImage,
  median,
  getColorWithType
};
