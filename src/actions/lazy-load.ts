import {
  lazyLoadSkeleton,
	type LazyProps,
	type OtherProps
} from '@/modules/lazy-load-skeleton';

const lazyLoad = (node: HTMLImageElement, props: LazyProps | OtherProps) => {
	lazyLoadSkeleton(node, props);
};

export default lazyLoad;
