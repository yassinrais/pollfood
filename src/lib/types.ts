export type Level = {
	name: string;
	style: string;
	min: number;
	max: number;
	items: Item[];
};

export interface Item {
	id: string;
	count: number;
	content: string;
	pictures: Picture[];
	score: number;
}

export interface Picture {
	id: string;
	filename: string;
	url: string;
}
