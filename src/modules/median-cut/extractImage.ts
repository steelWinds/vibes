const extractImage = (image: HTMLImageElement, canvas: HTMLCanvasElement): ImageData | null => {
	canvas.width = image.width;
	canvas.height = image.height;

	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

export default extractImage;