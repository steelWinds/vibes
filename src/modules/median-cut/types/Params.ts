interface IExtractCanvasParams {
	image: HTMLImageElement;
	canvas: HTMLCanvasElement;
	sizes?: { inline: number; block: number };
}

interface IColorDepthParams {
	depth: number;
	maxDepth: number;
}

interface IGetColorWithTypeParams extends IExtractCanvasParams {
	type: 'hex';
	colorDepth?: IColorDepthParams;
}

interface IMedianCutParams extends IExtractCanvasParams {
	colorDepth?: IColorDepthParams;
}

export type {
	IExtractCanvasParams,
	IColorDepthParams,
	IGetColorWithTypeParams,
	IMedianCutParams
};
