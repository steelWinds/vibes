import type { RGBData } from './types/RGBData.type';

const getColor = (RGBValues: RGBData[]) => {
	const color = RGBValues.reduce(
		(prev, curr) => {
			prev.r += curr.r;
			prev.g += curr.g;
			prev.b += curr.b;

			return prev;
		},

		{
			r: 0,
			g: 0,
			b: 0
		}
	);

	color.r = Math.round(color.r / RGBValues.length);
	color.g = Math.round(color.g / RGBValues.length);
	color.b = Math.round(color.b / RGBValues.length);

	return [color];
};

export default getColor;
