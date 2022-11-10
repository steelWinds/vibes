import sourceTypeStore from '@/stores/settings/source-type';
import unsplashImageQualityStore from '@/stores/settings/unsplash-image-quality';
import { derived } from 'svelte/store';

const sourceImagesURI = derived(
	[sourceTypeStore, unsplashImageQualityStore],
	([$images, $quality]) => {
		return Array.from($images.sourcesStack.values()).map((image) => {
			switch (typeof image) {
				case 'object':
					return image.urls[$quality];

				case 'string':
					return image;

				default: {
					const _never: never = image;

					return _never;
				}
			}
		});
	}
);

export default sourceImagesURI;
