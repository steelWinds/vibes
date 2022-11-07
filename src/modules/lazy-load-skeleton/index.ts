import type { ImageData } from '@/types/API/DataTypes/ImageData';

import PlaceholderImage from '@/assets/png-images/image-placeholder.png';
import imageOrient from './image-orient';
import lazyLoad from './lazy-load';

type OtherProps = {
	[key: string]: any;
};

interface IPreloaders {
  parentPreloaderClass: string[];
  imagePreloaderClass: string[];
}
interface LazyProps extends ImageData, IPreloaders {
	defaultAlt: string;
	defaultColorPlug: string;
}

interface HandlerProps extends IPreloaders {
	img: HTMLImageElement;
	parent: HTMLElement;
	source: string;
	observer: IntersectionObserver;
	alt: string;
}

const DATA_ATTR_SRC = 'data-src';
const DATA_ATTR_ALT = 'data-alt';
const DATA_ATTR_PARENT_PRELOADER = 'data-parent-preloader';
const DATA_ATTR_IMAGE_PRELOADER = 'data-image-preloader';

const PARENT_CLASS = '.image-lazy-load-container';

const observerCallback: IntersectionObserverCallback = (entries, observer) => {
	for (const entry of entries) {
		const img = entry.target as HTMLImageElement;
		const parent = img.closest(PARENT_CLASS) as HTMLElement;
		const source = img.getAttribute(DATA_ATTR_SRC);
		const alt = img.getAttribute(DATA_ATTR_ALT) ?? '';
		const parentPreloaderClass = img.getAttribute(DATA_ATTR_PARENT_PRELOADER)?.split(' ') ?? [];
		const imagePreloaderClass = img.getAttribute(DATA_ATTR_IMAGE_PRELOADER)?.split(' ') ?? [];

		if (!source) return;

		if (entry.isIntersecting) {
			handler({
				img,
				source,
				parent,
				alt,
				observer,
				parentPreloaderClass,
				imagePreloaderClass
			});
		}
	}
};

const setPostImageData = (props: HandlerProps) => {
  const {
    img,
    parent,
    alt,
    parentPreloaderClass,
    imagePreloaderClass,
    source
  } = props;

	img.classList.remove(...imagePreloaderClass);
	parent.classList.remove(...parentPreloaderClass);

	observer.unobserve(img);

	img.removeAttribute(DATA_ATTR_SRC);
	img.removeAttribute(DATA_ATTR_ALT);
	img.removeAttribute(DATA_ATTR_PARENT_PRELOADER);
	img.removeAttribute(DATA_ATTR_IMAGE_PRELOADER);

  loaded.add(source);
  
  img.setAttribute('alt', alt);
};

const handler = async (props: HandlerProps) => {
	const { img, source } = props;

	if (loaded.has(source)) {
		img.setAttribute('src', source);

		setPostImageData(props);
	}

	try {
		const loadedImage = await lazyLoad(source);

		img.setAttribute('src', loadedImage.src);
	} catch (_) {
		img.style.objectFit = 'cover';

		img.setAttribute('src', PlaceholderImage);
	} finally {
		setPostImageData(props);
	}
};

const loaded: Set<string> = new Set();
let observer: IntersectionObserver;

const lazyLoadSkeleton = (img: HTMLImageElement, props: LazyProps) => {
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
export type { LazyProps, OtherProps };
