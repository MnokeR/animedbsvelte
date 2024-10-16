import { animeOptions, mangaOptions } from '$lib/server/utils';
import type { Anime, Manga } from '$lib/types/query-ts';
import type { ServerLoad } from '@sveltejs/kit';

// export const load: ServerLoad = async ({ platform }) => {
// 	const apiCache = platform?.env.API_CACHE;
// 	const URL = platform?.env.BASE_URL;

// 	const animeCacheKey = 'anime_data';
// 	const mangaCacheKey = 'manga_data';
// 	const cacheTTL = 1800;

// 	if (!apiCache) {
// 		throw new Error('API_CACHE is not defined in the platform environment');
// 	}

// 	const cachedAnimeData = await apiCache.get(animeCacheKey);
// 	const cachedMangaData = await apiCache.get(mangaCacheKey);

// 	const data: { anime?: Anime; manga?: Manga } = {};

// 	// If Anime data is cached, use cached data, else fetch fresh data
// 	if (cachedAnimeData) {
// 		const animeData: { data: Anime } = JSON.parse(cachedAnimeData);
// 		data.anime = animeData.data;
// 	} else {
// 		try {
// 			const response = await fetch(URL!, animeOptions);
// 			if (!response.ok) {
// 				throw new Error(`Failed to fetch data: ${response.statusText}`);
// 			}
// 			const animeData: { data: Anime } = await response.json();

// 			await apiCache.put(animeCacheKey, JSON.stringify(animeData), {
// 				expirationTtl: cacheTTL
// 			});
// 			data.anime = animeData.data;
// 		} catch (error) {
// 			console.error('Error fetching anime data:', error);
// 		}
// 	}

// 	// If Manga data is cached, use cached data, else fetch fresh data
// 	if (cachedMangaData) {
// 		const mangaData: { data: Manga } = JSON.parse(cachedMangaData);
// 		data.manga = mangaData.data;
// 	} else {
// 		try {
// 			const response = await fetch(URL!, mangaOptions);
// 			if (!response.ok) {
// 				throw new Error(`Failed to fetch data: ${response.statusText}`);
// 			}
// 			const mangaData: { data: Manga } = await response.json();

// 			await apiCache.put(mangaCacheKey, JSON.stringify(mangaData), {
// 				expirationTtl: cacheTTL
// 			});
// 			data.manga = mangaData.data;
// 		} catch (error) {
// 			console.error('Error fetching manga data:', error);
// 		}
// 	}
// 	return data;
// };

export const load: ServerLoad = async () => {
	const workerUrl = 'https://animedbsvelte.mnoker.workers.dev';
	const data: { anime?: Anime; manga?: Manga } = {};

	try {
		const response = await fetch(workerUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		const responseData: { anime: { data: Anime }; manga: { data: Manga } } = await response.json();
		data.anime = responseData.anime.data;
		data.manga = responseData.manga.data;
	} catch (error) {
		console.error('Error fetching data from Worker:', error);
	}
	console.log(data);
	return data;
};
