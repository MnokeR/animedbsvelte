import type { Anime, Manga } from '$lib/types/query-ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/home', { method: 'POST' });
		if (!response.ok) {
			console.error('Fetch error details:', response.statusText);
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const responseData: Promise<{ anime: { data: Anime }; manga: { data: Manga } }> =
			response.json();
		return { data: responseData };
	} catch (error) {
		console.error('Error fetching data from Worker:', error);
		return { data: null };
	}
};
