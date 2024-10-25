import { mediaOptions } from '$lib/server/utils.js';
import { json } from '@sveltejs/kit';

const cacheTtl = 60 * 60;

export async function POST({ platform, request }) {
	const apiCache = platform?.env.API_CACHE;

	if (!apiCache) return new Response('API_CACHE is not defined', { status: 500 });

	const { mediaId, mediaType }: { mediaId: string; mediaType: 'Anime' | 'Manga' } =
		await request.json();

	const options = mediaOptions({ mediaId, mediaType });
	const cacheKey = mediaType + mediaId;

	const cachedMedia = await apiCache.get(cacheKey);
	let mediaData = cachedMedia ? JSON.parse(cachedMedia) : undefined;

	try {
		if (!cachedMedia) {
			const BASE_URL = platform.env.PUBLIC_BASE_URL;
			const response = await fetch(BASE_URL, options);
			if (!response.ok) throw new Error('Failed to fetch media data');
			mediaData = await response.json();
			await apiCache.put(cacheKey, JSON.stringify(mediaData), { expirationTtl: cacheTtl });
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
	return json(mediaData);
}
