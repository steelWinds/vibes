import type { IUserData } from './IUserData';

interface ICollectionData {
	id: string;
	user: IUserData;
	title: string;
	total_photos: number;
}

export type { ICollectionData };
