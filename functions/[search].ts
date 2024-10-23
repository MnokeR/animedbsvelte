import { KVNamespace } from '@cloudflare/workers-types';

type Env = {
	API_CACHE: KVNamespace;
	BASE_URL: string;
};
const cacheTtl = 60 * 60;
export default {
	async fetch(request: Request, env: Env) {
		const apiCache = env.API_CACHE;
		const BASE_URL = env.BASE_URL;
		const searchOptions = await request.json();
		const url = new URL(request.url);
		const cacheKey = url.toString();

		const cachedSearchQuery = await apiCache.get(cacheKey);

		let searchData = cachedSearchQuery ? cachedSearchQuery : undefined;

		try {
			if (!searchData) {
				const response = await fetch(BASE_URL, searchOptions);
				if (!response.ok) throw new Response('Failed to fetch search data');
				searchData = await response.json();
				await apiCache.put(cacheKey, JSON.stringify(searchData), { expirationTtl: cacheTtl });
			}
		} catch (error) {
			return new Response(`Error fetching data: ${error.message}`, { status: 500 });
		}
		return new Response(JSON.stringify(searchData), {
			status: 200,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		});
	}
};
