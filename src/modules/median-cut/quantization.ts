import type { RGBData } from './types/RGBData.type';
import colorRange from './colorRange';
import getColor from './getColor';

const quantization = (RGBValues?: RGBData[], depth = 1, maxDepth = 1): RGBData[] | undefined => {
	if (!RGBValues) return;

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
		...(quantization(RGBValues.slice(0, mid), depth + 1, maxDepth) ?? []),
		...(quantization(RGBValues.slice(mid + 1), depth + 1, maxDepth) ?? [])
	];
};

export default quantization;
