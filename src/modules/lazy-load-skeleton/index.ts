import type { ImageData } from '@/types/API/ImageData';

import imageOrient from './image-orient';

interface LazyProps extends ImageData {
	preloaderClass: string;
	defaultAlt: string;
	defaultColorPlug: string;
}

const loaded = new Set();

const lazyLoadSkeleton = (node: HTMLImageElement, props: LazyProps) => {
	const {
		src,
		urls,
		width,
		color,
		height,
		description,
		defaultAlt,
		defaultColorPlug,
		preloaderClass
	} = props;

	const source = urls?.regular ?? src;
	const parentElement = node.parentElement;

	if (!source || !parentElement) return;

	if (loaded.has(source)) {
		node.setAttribute('src', source);

		return;
	}

	const altContent = description ?? defaultAlt;
	const colorPlug = color ?? defaultColorPlug;
	const imageRatio = imageOrient({
		width,
		height
	});

	parentElement.style.backgroundColor = colorPlug;
	parentElement.style.aspectRatio = imageRatio;
	parentElement.classList.add(preloaderClass);

	const loadedImg = new Image();

	loadedImg.setAttribute('src', source);

	loadedImg.onload = () => {
		loaded.add(source);

		node.setAttribute('src', loadedImg.src);
		node.setAttribute('alt', altContent);

		parentElement.classList.remove(preloaderClass);
	};
};

export default lazyLoadSkeleton;
export type { LazyProps };
