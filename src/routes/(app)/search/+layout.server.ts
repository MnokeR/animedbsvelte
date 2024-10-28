import { getParams } from '$lib/client/utils';
import type { SearchResults } from '$lib/types/query-ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
	const searchParams = url.searchParams;
	const params = getParams(searchParams);
	const search = url.pathname + url.search;
	const mediaType = url.pathname.includes('/anime') ? 'Anime' : 'Manga';
	const hasParams = [...searchParams.keys()].length > 0;
	if (!hasParams) return;
	try {
		const response = await fetch('/api/search', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				search,
				params,
				mediaType
			})
		});
		if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
		const promiseData: Promise<SearchResults> = response.json();
		return { data: promiseData };
	} catch (error) {
		console.error('Error fetching media data:', error);
		return { data: null };
	}
};
