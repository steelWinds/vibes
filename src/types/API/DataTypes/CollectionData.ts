import type { UserData } from './UserData';

interface CollectionData {
	id: string;
	user: UserData;
	title: string;
	total_photos: number;
}

export type { CollectionData };
