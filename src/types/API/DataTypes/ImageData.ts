interface ImageData {
	id: string;
	src?: string;
	urls?: {
		regular: string;
	};
	width: number;
	height: number;
	color?: string;
	description?: string;
	alt_description?: string;
}

export type { ImageData };
