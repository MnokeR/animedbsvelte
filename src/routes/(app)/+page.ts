import { PUBLIC_WORKER_URL } from '$env/static/public';
import type { Anime, Manga } from '$lib/types/query-ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const workerUrl = PUBLIC_WORKER_URL;

	try {
		const response = await fetch('/');
		if (!response.ok) {
			console.error('Fetch error details:', response.statusText);

			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const responseData: Promise<{ anime: { data: Anime }; manga: { data: Manga } }> =
			response.json();
		return { data: responseData };
	} catch (error) {
		console.error('Error fetching data from Worker:', error);
	}
};
