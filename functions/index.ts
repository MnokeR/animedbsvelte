import { KVNamespace } from '@cloudflare/workers-types';

type Anime = {
	trending: { media: AnimeShort[] };
	top: { media: AnimeShort[] };
	popular: { media: AnimeShort[] };
	season: { media: AnimeShort[] };
	nextSeason: { media: AnimeShort[] };
};

type Manga = {
	trending: { media: AnimeShort[] };
	popular: { media: AnimeShort[] };
	manhwa: { media: AnimeShort[] };
	top: { media: AnimeShort[] };
};

type AnimeShort = {
	id: number;
	title: {
		userPreferred: string;
	};
	coverImage: {
		large: string;
		extraLarge: string;
		color: string;
	};
	format: string;
	type: string;
};

type Env = {
	API_CACHE: KVNamespace;
	BASE_URL: string;
};

const animeQuery =
	'query($season:MediaSeason,$seasonYear:Int $nextSeason:MediaSeason,$nextYear:Int){trending:Page(page:1,perPage:6){media(sort:TRENDING_DESC,type:ANIME,isAdult:false){...media}}season:Page(page:1,perPage:6){media(season:$season,seasonYear:$seasonYear,sort:POPULARITY_DESC,type:ANIME,isAdult:false){...media}}nextSeason:Page(page:1,perPage:6){media(season:$nextSeason,seasonYear:$nextYear,sort:POPULARITY_DESC,type:ANIME,isAdult:false){...media}}popular:Page(page:1,perPage:6){media(sort:POPULARITY_DESC,type:ANIME,isAdult:false){...media}}top:Page(page:1,perPage:12){media(sort:SCORE_DESC,type:ANIME,isAdult:false){...media}}}fragment media on Media{id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season seasonYear description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity mediaListEntry{id status}nextAiringEpisode{airingAt timeUntilAiring episode}studios(isMain:true){edges{isMain node{id name}}}}';

const mangaQuery =
	'query{trending:Page(page:1,perPage:6){media(sort:TRENDING_DESC,type:MANGA,isAdult:false){...media}}popular:Page(page:1,perPage:6){media(sort:POPULARITY_DESC,type:MANGA,isAdult:false){...media}}manhwa:Page(page:1,perPage:6){media(sort:POPULARITY_DESC,type:MANGA,countryOfOrigin:"KR",isAdult:false){...media}}top:Page(page:1,perPage:12){media(sort:SCORE_DESC,type:MANGA,isAdult:false){...media}}}fragment media on Media{id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity mediaListEntry{id status}}';

const cacheTTL = 60 * 60;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const apiCache = env.API_CACHE;
		const BASE_URL = env.BASE_URL;

		if (!apiCache) {
			return new Response('API_CACHE is not defined', { status: 500 });
		}

		const cacheKeys = { anime: 'anime_data', manga: 'manga_data' };

		const date = new Date();
		const seasons = [
			{ label: 'WINTER', months: [1, 2, 3] },
			{ label: 'SPRING', months: [4, 5, 6] },
			{ label: 'SUMMER', months: [7, 8, 9] },
			{ label: 'FALL', months: [10, 11, 12] }
		];

		let season: string = '';
		let nextSeason: string = '';
		let nextYear: number = 0;
		const currentMonth = date.getMonth() + 1;
		const year = date.getFullYear();
		for (let i = 0; i < seasons.length; i++) {
			if (seasons[i].months.includes(currentMonth)) {
				season = seasons[i].label;
				const currentIndex = i;
				const nextIndex = currentIndex === seasons.length - 1 ? 0 : currentIndex + 1;
				nextSeason = seasons[nextIndex].label;
				nextYear = currentIndex === seasons.length - 1 ? year + 1 : year;
				break;
			}
		}

		const animeVariables = {
			type: 'ANIME',
			season: season,
			seasonYear: year,
			nextSeason: nextSeason,
			nextYear: nextYear
		};

		const animeOptions = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				'Cache-Control': 'public, max-age=60'
			},
			body: JSON.stringify({
				query: animeQuery,
				variables: animeVariables
			})
		};

		const mangaVariables = {
			type: 'MANGA',
			season: season,
			seasonYear: year,
			nextSeason: nextSeason,
			nextYear: nextYear
		};

		const mangaOptions = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				'Cache-Control': 'public, max-age=60'
			},
			body: JSON.stringify({
				query: mangaQuery,
				variables: mangaVariables
			})
		};

		const cachedAnimeData = await apiCache.get(cacheKeys.anime);
		const cachedMangaData = await apiCache.get(cacheKeys.manga);

		let animeData: { data: Anime } = cachedAnimeData ? JSON.parse(cachedAnimeData) : undefined;
		let mangaData: { data: Manga } = cachedMangaData ? JSON.parse(cachedMangaData) : undefined;

		try {
			if (!animeData) {
				const animeResponse = await fetch(BASE_URL, animeOptions);
				if (!animeResponse.ok) throw new Response('Failed to fetch anime data');
				animeData = await animeResponse.json();
				await apiCache.put(cacheKeys.anime, JSON.stringify(animeData), {
					expirationTtl: cacheTTL
				});
			}

			if (!mangaData) {
				const mangaResponse = await fetch(BASE_URL, mangaOptions);
				if (!mangaResponse.ok) throw new Response('Failed to fetch manga data');
				mangaData = await mangaResponse.json();
				await apiCache.put(cacheKeys.manga, JSON.stringify(mangaData), {
					expirationTtl: cacheTTL
				});
			}
		} catch (error) {
			return new Response(`Error fetching data: ${error.message}`, { status: 500 });
		}
		return new Response(JSON.stringify({ anime: animeData, manga: mangaData }), {
			status: 200,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		});
	}
};
