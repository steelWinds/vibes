import type { IOrientParams } from './types/Params'

const gcd = (a: number, b: number): number => {
	if (!b) {
		return a;
	}

	return gcd(b, a % b);
};

const imageOrient = (imgObj: IOrientParams): string => {
	const inlineSize = imgObj?.naturalWidth ?? imgObj.width ?? 0;
	const blockSize = imgObj?.naturalHeight ?? imgObj.height ?? 0;

	const sizesGcd = gcd(inlineSize, blockSize);

	return `${inlineSize / sizesGcd}/${blockSize / sizesGcd}`;
};

export default imageOrient;
