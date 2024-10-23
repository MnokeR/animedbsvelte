import { searchOptions } from '$lib/server/utils.js';
import type { SearchVariables } from '$lib/types/query-ts.js';
import { json } from '@sveltejs/kit';

const cacheTtl = 60 * 60;

export async function POST({ platform, request }) {
	const apiCache = platform?.env.API_CACHE;
	const {
		mediaType,
		params,
		search
	}: { mediaType: 'Anime' | 'Manga'; params: SearchVariables; search: string } =
		await request.json();

	if (!apiCache) return new Response('API_CACHE is not defined', { status: 500 });

	const cacheKey = search;
	const cachedSearch = await apiCache.get(cacheKey);
	let searchData = cachedSearch ? JSON.parse(cachedSearch) : undefined;

	try {
		if (!cachedSearch) {
			const BASE_URL = platform?.env.PUBLIC_BASE_URL;
			const searchOption = searchOptions({ params, mediaType });
			const response = await fetch(BASE_URL, searchOption);

			if (!response.ok) throw new Error('Failed to fetch search results');
			searchData = await response.json();
			await apiCache.put(cacheKey, JSON.stringify(searchData), { expirationTtl: cacheTtl });
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error fetching data:`, error);
			return new Response(`Error fetching data: ${error.message}`, { status: 500 });
		} else {
			console.error('Unknown error:', error);
			return new Response('An unknown error occurred', { status: 500 });
		}
	}
	return json(searchData);
}
