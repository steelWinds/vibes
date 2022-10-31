import lazyLoadSkeleton, { type LazyProps } from '@/modules/lazy-load-skeleton';

const lazyLoad = (node: HTMLImageElement, props: LazyProps) => {
	lazyLoadSkeleton(node, props);
};

export default lazyLoad;
