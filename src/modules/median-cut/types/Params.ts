import type { OutputColorType } from '@/configs/colors-output-type';
import type { IRGBData } from './Types';

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

interface IColorFunctionParams {
	colorDepth?: IColorDepthParams;
}

interface IGetColorWithTypeParams
	extends IExtractCanvasParams,
		IColorFunctionParams {
	type: OutputColorType;
}

type IMedianCutParams = IExtractCanvasParams & IColorFunctionParams;

interface IQuantizationParams extends IColorFunctionParams {
	RGBValues: IRGBData[];
}

export type {
	IExtractCanvasParams,
	IColorDepthParams,
	IGetColorWithTypeParams,
	IMedianCutParams,
	IQuantizationParams
};
