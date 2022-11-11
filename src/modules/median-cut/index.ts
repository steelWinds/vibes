import type { IMedianCutParams } from './types/Params';
import type { IRGBData } from './types/Types';

import supportsWorkerType from '@/modules/supports/supports-worker-type';
import extractImage from './extractImage';
import getDiscreteRGBSet from './getDiscreteRGBSet';
import getColorWithType from './getColorWithType';

const median = (withWorker: boolean) => {
	let worker: Worker | null = null;

	if (typeof window === 'undefined') return;

	if (supportsWorkerType() && window.Worker && withWorker) {
		worker = new Worker(new URL('./quantization-worker.ts', import.meta.url), {
			type: 'module'
		});
	}

	const handler = async (props: IMedianCutParams): Promise<IRGBData[]> => {
		const { image, canvas, colorDepth = { depth: 1, maxDepth: 1 } } = props;

		if (!image || !canvas) {
			throw new Error('Incorrect props');
		}

		const imageData = await extractImage(props);

		if (!imageData) {
			throw new Error("Incorrect image's data");
		}

		if (worker) {
			return new Promise((resolve) => {
				worker?.postMessage({
					imageData,
					colorDepth
				});

				worker?.addEventListener('message', (e) => resolve(e.data));
			});
		}

		return getDiscreteRGBSet(imageData, colorDepth);
	};

	return handler;
};

export { extractImage, median, getColorWithType };
