import type { ILazyParams } from './types/Params'
import {
  DATA_ATTR_SRC,
  DATA_ATTR_ALT,
  DATA_ATTR_PARENT_PRELOADER,
  DATA_ATTR_IMAGE_PRELOADER,
  
  PARENT_CLASS,
} from './constants'

import imageOrient from './image-orient';
import lazyLoad from './lazy-load';
import lazyHandler from './lazy-handler'

const observerCallback: IntersectionObserverCallback = (entries, observer) => {
	for (const entry of entries) {
		const img = entry.target as HTMLImageElement;
		const parent = img.closest(PARENT_CLASS) as HTMLElement;
		const source = img.getAttribute(DATA_ATTR_SRC);
		const alt = img.getAttribute(DATA_ATTR_ALT) ?? '';
		const parentPreloaderClass =
			img.getAttribute(DATA_ATTR_PARENT_PRELOADER)?.split(' ') ?? [];
		const imagePreloaderClass =
			img.getAttribute(DATA_ATTR_IMAGE_PRELOADER)?.split(' ') ?? [];

		if (!source) return;

		if (entry.isIntersecting) {
			lazyHandler({
				img,
				source,
				parent,
				alt,
				observer,
				parentPreloaderClass,
        imagePreloaderClass,
        loaded
			});
		}
	}
};

const loaded: Set<string> = new Set();
let observer: IntersectionObserver;

const lazyLoadSkeleton = (img: HTMLImageElement, props: ILazyParams) => {
	const {
		src,
		width,
		color,
		height,
		description,
		defaultAlt,
		defaultColorPlug,
		imagePreloaderClass,
		parentPreloaderClass
	} = props;

	const source = src;
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
	parentElement.classList.add(...parentPreloaderClass);

	img.classList.add(...imagePreloaderClass);

	if (!observer) {
		observer = new IntersectionObserver(observerCallback, {
			root: null,
			rootMargin: '0px',
			threshold: 0
		});
	}

	img.setAttribute(DATA_ATTR_SRC, source);
	img.setAttribute(DATA_ATTR_ALT, altContent);
	img.setAttribute(DATA_ATTR_IMAGE_PRELOADER, imagePreloaderClass.join());
	img.setAttribute(DATA_ATTR_PARENT_PRELOADER, parentPreloaderClass.join());

	observer.observe(img);
};

export { lazyLoadSkeleton, lazyLoad, imageOrient };
