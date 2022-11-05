import type { ImageData } from '@/types/API/DataTypes/ImageData';

import imageOrient from './image-orient';
import lazyLoad, { type LazyLoadCallbackProps } from './lazy-load';

type OtherProps = {
	[key: string]: any;
};

interface LazyProps extends ImageData {
	preloaderClass: string;
	defaultAlt: string;
	defaultColorPlug: string;
}

const DATA_ATTR_SRC = 'data-src';
const DATA_ATTR_ALT = 'data-alt';
const DATA_ATTR_PRELOADER = 'data-preloader';
const PARENT_CLASS = '.image-lazy-load-container';

const observerCallback: IntersectionObserverCallback = (entries, observer) => {
	for (const entry of entries) {
		const img = entry.target as HTMLImageElement;
		const parent = img.closest(PARENT_CLASS) as HTMLElement;
		const source = img.getAttribute(DATA_ATTR_SRC);
		const alt = img.getAttribute(DATA_ATTR_ALT) ?? '';
		const preloaderClass = img.getAttribute(DATA_ATTR_PRELOADER) ?? '';

		const setPostImageData = (props: LazyLoadCallbackProps) => {
			const { img, parent } = props;

			img.setAttribute('alt', alt);
			parent?.classList.remove(preloaderClass);

			observer.unobserve(img);

			img.removeAttribute(DATA_ATTR_SRC);
			img.removeAttribute(DATA_ATTR_ALT);
			img.removeAttribute(DATA_ATTR_PRELOADER);
		};

		if (!source) return;

		if (entry.isIntersecting) {
			if (loaded.has(source)) {
				img.setAttribute('src', source);

				setPostImageData({ img, parent });
			}

			lazyLoad(img, setPostImageData, { source, alt, memory: loaded });
		}
	}
};

const loaded: Set<string> = new Set();
let observer: IntersectionObserver;

const lazyLoadSkeleton = (img: HTMLImageElement, props: LazyProps) => {
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
	const parentElement = img.closest(PARENT_CLASS) as HTMLElement;

	if (!source || !parentElement) {
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

	if (!observer) {
		observer = new IntersectionObserver(observerCallback, {
			root: null,
			rootMargin: '0px',
			threshold: 0
		});
	}

	img.setAttribute(DATA_ATTR_SRC, source);
	img.setAttribute(DATA_ATTR_ALT, altContent);
	img.setAttribute(DATA_ATTR_PRELOADER, preloaderClass);

	observer.observe(img);
};

export default lazyLoadSkeleton;
export type { LazyProps, OtherProps };
