import { env } from '$env/dynamic/private';
import type { Anime, Manga } from '$lib/types/query-ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const workerUrl = env.WORKER_URL;

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
