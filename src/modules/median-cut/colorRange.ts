import type { IRGBData } from './types/Types';

const colorRange = (RGBValues: IRGBData[]) => {
	let rMin = Number.MAX_VALUE;
	let gMin = Number.MAX_VALUE;
	let bMin = Number.MAX_VALUE;

	let rMax = Number.MIN_VALUE;
	let gMax = Number.MIN_VALUE;
	let bMax = Number.MIN_VALUE;

	RGBValues.forEach((pixel) => {
		rMin = Math.min(rMin, pixel.r);
		gMin = Math.min(gMin, pixel.g);
		bMin = Math.min(bMin, pixel.b);

		rMax = Math.max(rMax, pixel.r);
		gMax = Math.max(gMax, pixel.g);
		bMax = Math.max(bMax, pixel.b);
	});

	const rRange = rMax - rMin;
	const gRange = gMax - gMin;
	const bRange = bMax - bMin;

	const range = Math.max(rRange, gRange, bRange);

	switch (range) {
		case rRange:
			return 'r';
		case gRange:
			return 'g';
		case bRange:
			return 'b';
	}
};

export default colorRange;
