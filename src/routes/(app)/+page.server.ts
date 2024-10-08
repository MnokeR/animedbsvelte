import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ platform }) => {
	const apiCache = platform?.env.API_CACHE;
	const URL = platform?.env.BASE_URL;
	console.log(platform?.env);
};
