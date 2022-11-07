interface LazyLoadProps {
	source: string;
	parentClass: string;
}

type LazyLoadCallbackProps = {
	img: HTMLImageElement;
	parent?: HTMLElement;
};

const lazyLoad = (source: string) => {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();

		image.setAttribute('src', source);
		image.setAttribute('crossOrigin', 'anonymous');

		if (image.complete) {
			resolve(image);
		}

		image.onload = () => {
			resolve(image);
		};

		image.onerror = () => {
			reject(new Error("Image is don't load"));
		};
	});
};

export default lazyLoad;
export type { LazyLoadProps, LazyLoadCallbackProps };
