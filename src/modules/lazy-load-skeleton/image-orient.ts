type OrientType = string;

interface OrientProps {
	width?: number;
	height?: number;
	naturalWidth?: number;
	naturalHeight?: number;
}

const gcd = (a: number, b: number): number => {
	if (!b) {
		return a;
	}

	return gcd(b, a % b);
};

const imageOrient = (imgObj: OrientProps): OrientType => {
	const inlineSize = imgObj?.naturalWidth ?? imgObj.width ?? 0;
	const blockSize = imgObj?.naturalHeight ?? imgObj.height ?? 0;

	const sizesGcd = gcd(inlineSize, blockSize);

	return `${inlineSize / sizesGcd}/${blockSize / sizesGcd}`;
};

export default imageOrient;
export type { OrientType, OrientProps };
