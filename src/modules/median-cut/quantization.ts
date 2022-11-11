import type { IQuantizationParams } from './types/Params';

import colorRange from './colorRange';
import getColor from './getColor';

const quantization = (
	props: IQuantizationParams
): IQuantizationParams['RGBValues'] => {
	const { RGBValues, colorDepth = { depth: 1, maxDepth: 1 } } = props;
	const { depth, maxDepth } = colorDepth;

	if (depth === maxDepth || !RGBValues.length) {
		return getColor(RGBValues);
	}

	const componentToSortBy = colorRange(RGBValues);

	RGBValues.sort((p1, p2) => {
		if (!componentToSortBy) return -1;

		return p1[componentToSortBy] - p2[componentToSortBy];
	});

	const mid = RGBValues.length / 2;

	return [
		...(quantization({
			RGBValues: RGBValues.slice(0, mid),
			colorDepth: { depth: depth + 1, maxDepth }
		}) ?? []),
		...(quantization({
			RGBValues: RGBValues.slice(mid + 1),
			colorDepth: { depth: depth + 1, maxDepth }
		}) ?? [])
	];
};

export default quantization;
