interface IImageData {
	id: string;
	src: string;
	urls: {
		full: string;
		raw: string;
		regular: string;
		small: string;
		thumb: string;
	};
	width: number;
	height: number;
	color: string;
	description?: string;
	alt_description?: string;
}

export type { IImageData };
