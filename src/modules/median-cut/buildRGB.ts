import type { IRGBData } from './types/Types';

const buildRGB = (imageData: ImageData['data']) => {
	const rgbValues: IRGBData[] = [];

	for (let i = 0; i < imageData.length; i += 4) {
		rgbValues.push({
			r: imageData[i],
			g: imageData[i + 1],
			b: imageData[i + 2]
		});
	}

	return rgbValues;
};

export default buildRGB;
