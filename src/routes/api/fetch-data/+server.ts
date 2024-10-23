import type { RequestHandler } from './$types';
import type { Anime, Manga } from '$lib/types/query-ts';

export const GET: RequestHandler = async ({ url, request }) => {
	console.log(request.headers);
	// const URL = url.origin;
	// try {
	// 	const response = await fetch('https://animedbsvelte.pages.dev/');
	// 	if (!response.ok) {
	// 		return new Response('Failed to fetch data from Worker', { status: 500 });
	// 	}
	// 	const responseData: { anime: { data: Anime }; manga: { data: Manga } } = await response.json();
	// 	return new Response(JSON.stringify({ data: responseData }), {
	// 		headers: { 'Content-Type': 'application/json' }
	// 	});
	// } catch (error) {
	// 	return new Response(`Error: ${error}`, { status: 500 });
	// }
};
