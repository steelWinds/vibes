import type { ILazyHandlerParams } from './types/Params';
import {
	DATA_ATTR_SRC,
	DATA_ATTR_ALT,
	DATA_ATTR_PARENT_PRELOADER,
	DATA_ATTR_IMAGE_PRELOADER
} from './constants';

const setPostImageData = (props: ILazyHandlerParams) => {
	const {
		img,
		parent,
		alt,
		parentPreloaderClass,
		imagePreloaderClass,
		source,
		observer,
		loaded
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

export default setPostImageData;
