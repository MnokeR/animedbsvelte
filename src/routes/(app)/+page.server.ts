import type { Anime, Manga } from '$lib/types/query-ts';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	const workerUrl = 'https://animedbsvelte.mnoker.workers.dev';

	try {
		const response = await fetch(workerUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const responseData: Promise<{ anime: { data: Anime }; manga: { data: Manga } }> =
			response.json();
		return { data: responseData };
	} catch (error) {
		console.error('Error fetching data from Worker:', error);
	}
};
