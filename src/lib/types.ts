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
	filename: string;
	url: string;
	score: number;
}
