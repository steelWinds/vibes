import getDiscreteRGBSet from './getDiscreteRGBSet';

addEventListener('message', (e) => {
	const imageData = e.data.imageData as ImageData;
	const colorDepth = e.data.colorDepth;

	const result = getDiscreteRGBSet(imageData, colorDepth);

	postMessage(result);
});
