import type { MediaPage } from '$lib/types/query-ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, params, fetch }) => {
	const mediaId = params.slug;
	const mediaType = url.pathname.includes('/anime') ? 'Anime' : 'Manga';
	try {
		const response = await fetch('/api/media', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mediaId, mediaType })
		});
		if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
		const promiseData: Promise<MediaPage> = response.json();
		return { data: promiseData };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
};
