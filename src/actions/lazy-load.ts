import type { ILazyParams } from '@/modules/lazy-load-skeleton/types/Params';

import { lazyLoadSkeleton } from '@/modules/lazy-load-skeleton';

const lazyLoad = (node: HTMLImageElement, props: ILazyParams) => {
	lazyLoadSkeleton(node, props);
};

export default lazyLoad;
