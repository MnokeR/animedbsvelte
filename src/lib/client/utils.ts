import type { PageInfo, SearchVariables } from '$lib/types/query-ts';
import { animeSearchQuery, mangaSearchQuery } from './querys';

export type Categories = {
	label: string;
	value: string;
}[];
// Anime Categories
export const animeCategories: Categories = [
	{ label: 'Trending', value: 'trending' },
	{ label: 'Season Top', value: 'season' },
	{ label: 'Next Season', value: 'nextSeason' },
	{ label: 'Most Popular', value: 'popular' },
	{ label: 'Top Rated', value: 'top' }
];

// Manga Categories
export const mangaCategories: Categories = [
	{ label: 'Trending', value: 'trending' },
	{ label: 'Manhwa', value: 'manhwa' },
	{ label: 'Most Popular', value: 'popular' },
	{ label: 'Top Rated', value: 'top' }
];

type SearchOptionsParams = {
	params: SearchVariables;
	pageInfo?: PageInfo;
	mediaType: 'Anime' | 'Manga';
};

export const searchOptions = ({ params, pageInfo, mediaType }: SearchOptionsParams) => {
	const genres = params.genres ? params.genres.split(',').map((item) => item.trim()) : undefined;
	const adult = params.isAdult === 'True' ? true : false;
	const variables = {
		page: pageInfo ? pageInfo.currentPage + 1 : 1,
		type: mediaType === 'Anime' ? 'ANIME' : 'MANGA',
		search: params.search,
		genres: genres,
		year: params.year && params.year + '%',
		season: params.season,
		format: params.format,
		status: params.status,
		countryOfOrigin: params.countryOfOrigin,
		isAdult: adult,
		sort: params.sort ? params.sort : params.search ? 'SEARCH_MATCH' : undefined
	};
	const options = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: mediaType === 'Anime' ? animeSearchQuery : mangaSearchQuery,
			variables
		})
	};
	return options;
};

export const searchableParams = [
	'search',
	'genres',
	'year',
	'season',
	'format',
	'status',
	'countryOfOrigin',
	'isAdult',
	'sort'
];

export const getParams = (searchParam: URLSearchParams) => {
	const searchParams: SearchVariables = {} as SearchVariables;
	searchableParams.forEach((param) => {
		searchParams[param as keyof SearchVariables] = searchParam.get(param) || undefined;
	});
	return searchParams;
};
