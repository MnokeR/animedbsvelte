import { env } from '$env/dynamic/private';
import { searchOptions, getParams } from '$lib/client/utils';
import type { SearchResults } from '$lib/types/query-ts';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch }) => {
	const URL = env.BASE_URL;
	const searchParams = url.searchParams;
	const path = url.pathname;
	const hasParams = [...searchParams.keys()].length > 0;
	const mediaType = path === '/search/anime' ? 'Anime' : 'Manga';

	const params = getParams(searchParams);
	const searchOption = searchOptions({ params, mediaType });

	if (!hasParams) return;

	try {
		const response = await fetch(URL, searchOption);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const promiseData: Promise<SearchResults> = response.json();
		return { data: promiseData };
	} catch (error) {
		console.error('Error fetching media data:', error);
	}
};
