import type { OutputColorType } from '@/configs/colors-output-type' 

interface IExtractCanvasParams {
	image: HTMLImageElement;
	canvas: HTMLCanvasElement;
	sizes?: { inline: number; block: number };
	setCanvasSize?: boolean;
}

interface IColorDepthParams {
	depth: number;
	maxDepth: number;
}

interface IGetColorWithTypeParams extends IExtractCanvasParams {
	type: OutputColorType;
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
