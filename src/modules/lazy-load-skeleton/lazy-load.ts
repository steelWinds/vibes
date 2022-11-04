interface LazyLoadProps {
	source: string;
	alt: string;
	memory: Set<string>;
}

type LazyLoadCallbackProps = {
	img: HTMLImageElement;
	parent?: HTMLElement;
};

type LazyLoadCallback = (props: LazyLoadCallbackProps) => void;

const lazyLoad = async (
	targetImg: HTMLImageElement,
	callback: LazyLoadCallback,
	props: LazyLoadProps
) => {
	const { source, memory } = props;
	const image = new Image();

	image.setAttribute('src', source);

	image.onload = () => {
		const parent = targetImg.parentElement as HTMLElement;

		if (!targetImg) return;

		memory.add(source);

		targetImg.setAttribute('src', source);

		callback?.({ img: targetImg, parent });
	};
};

export default lazyLoad;
export type { LazyLoadProps, LazyLoadCallback, LazyLoadCallbackProps };
