import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

interface IPreloadersParams {
	parentPreloaderClass: string[];
	imagePreloaderClass: string[];
}

interface ILazyParams extends IImageData, IPreloadersParams {
	defaultAlt: string;
	defaultColorPlug: string;
}

interface ILazyHandlerParams extends IPreloadersParams {
	img: HTMLImageElement;
	parent: HTMLElement;
	source: string;
	observer: IntersectionObserver;
	alt: string;
	loaded: Set<string>;
}

interface IOrientParams {
	width?: number;
	height?: number;
	naturalWidth?: number;
	naturalHeight?: number;
}

export type {
	IPreloadersParams,
	ILazyParams,
	ILazyHandlerParams,
	IOrientParams
};
