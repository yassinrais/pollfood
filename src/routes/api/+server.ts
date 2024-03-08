import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const { data } = await fetch('https://foodpoll.devs.ma/data').then((res) => res.json());

	let cookie: string;
	const page = await fetch('https://foodpoll.devs.ma/').then((res) => {
		cookie = res.headers.getSetCookie() as string;

		return res.text();
	});

	const csrfToken = page.match(/<meta name="csrf-token" content="([^"]+)">/)?.[1];
	const [_, id, sessionToken, staticToken] = page.match(
		/<div id="([^"]+)"[^>]*data-phx-session="([^"]+)"[^>]*data-phx-static="([^"]+)"/
	)!;

	return Response.json({
		data,
		id,
		sessionToken,
		csrfToken,
		staticToken,
		cookie: cookie!
	});
};
