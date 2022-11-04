import type { ExtractCanvas } from './types/ExtractCanvas.type';

interface Props extends ExtractCanvas {
	sizes?: { inline: number; block: number };
}

const extractImage = (props: Props): ImageData | null => {
	const { image, canvas, sizes } = props;

	canvas.width = sizes?.inline ?? image.naturalWidth ?? image.width;
	canvas.height = sizes?.block ?? image.naturalHeight ?? image.height;

	console.log(image.naturalWidth, image.height);

	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	const xPoint = image.naturalWidth / 2 - canvas.width / 2;
	const yPoint = image.naturalHeight / 2 - canvas.height / 2;

	ctx.drawImage(image, -xPoint, -yPoint);

	return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

export default extractImage;
