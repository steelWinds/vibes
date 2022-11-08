import type { ILazyHandlerParams } from './types/Params';

import PlaceholderImage from '@/assets/png-images/image-placeholder.png';
import lazyLoad from './lazy-load';
import setPostImageData from './set-post-image-data';

const lazyHandler = async (props: ILazyHandlerParams) => {
	const { img, source, loaded } = props;

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

export default lazyHandler;
