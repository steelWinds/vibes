import type { ExtractCanvas } from './types/ExtractCanvas.type'

interface Props extends ExtractCanvas {
  sizes?: { inline: number, block: number }
}

const extractImage = (props: Props): ImageData | null => {
  const { image, canvas, sizes } = props
  
  canvas.width = sizes?.inline ?? image.width;
	canvas.height = sizes?.block ?? image.height;

	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

export default extractImage;
