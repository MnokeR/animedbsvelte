import { animeOptions, mangaOptions } from '$lib/server/utils.js';
import type { Anime, Manga } from '$lib/types/query-ts.js';
import { json } from '@sveltejs/kit';

const cacheTtl = 60 * 60;

export async function POST({ platform }) {
	const apiCache = platform?.env.API_CACHE;

	if (!apiCache) {
		return new Response('API_CACHE is not defined', { status: 500 });
	}

	const cacheKeys = { anime: 'anime_data', manga: 'manga_data' };

	const cachedAnimeData = await apiCache.get(cacheKeys.anime);
	const cachedMangaData = await apiCache.get(cacheKeys.manga);

	let animeData: { data: Anime } = cachedAnimeData ? JSON.parse(cachedAnimeData) : undefined;
	let mangaData: { data: Manga } = cachedMangaData ? JSON.parse(cachedMangaData) : undefined;

	try {
		if (!animeData) {
			const BASE_URL = platform?.env.PUBLIC_BASE_URL;
			const animeResponse = await fetch(BASE_URL, animeOptions);
			if (!animeResponse.ok) throw new Error('Failed to fetch anime data');
			animeData = await animeResponse.json();
			await apiCache.put(cacheKeys.anime, JSON.stringify(animeData), {
				expirationTtl: cacheTtl
			});
		}

		if (!mangaData) {
			const BASE_URL = platform?.env.PUBLIC_BASE_URL;
			const mangaResponse = await fetch(BASE_URL, mangaOptions);
			if (!mangaResponse.ok) throw new Error('Failed to fetch manga data');
			mangaData = await mangaResponse.json();
			await apiCache.put(cacheKeys.manga, JSON.stringify(mangaData), {
				expirationTtl: cacheTtl
			});
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
	return json({ anime: animeData, manga: mangaData });
}
