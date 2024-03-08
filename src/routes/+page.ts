import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	return await event.fetch('./api').then((res) => res.json());
};
