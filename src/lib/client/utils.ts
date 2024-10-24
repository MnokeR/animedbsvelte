import type { PageInfo, SearchVariables } from '$lib/types/query-ts';
import { animeSearchQuery, mangaSearchQuery } from './querys';

export type Categories = {
	label: string;
	value: string;
	path: string;
}[];

// SEASONS AND DATES
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

// Anime Categories
export const animeCategories: Categories = [
	{
		label: 'Trending',
		value: 'trending',
		path: '/search/anime?sort=TRENDING_DESC'
	},
	{
		label: 'Season Top',
		value: 'season',
		path: `/search/anime?season=${season}&year=${year}&sort=POPULARITY_DESC`
	},
	{
		label: 'Next Season',
		value: 'nextSeason',
		path: `/search/anime?season=${nextSeason}&year=${nextYear}`
	},
	{
		label: 'Most Popular',
		value: 'popular',
		path: '/search/anime?sort=POPULARITY_DESC'
	},
	{
		label: 'Top Rated',
		value: 'top',
		path: '/search/anime?sort=SCORE_DESC'
	}
];

// Manga Categories
export const mangaCategories: Categories = [
	{
		label: 'Trending',
		value: 'trending',
		path: '/search/manga?sort=TRENDING_DESC'
	},
	{
		label: 'Popular Manhwa',
		value: 'manhwa',
		path: '/search/manga?countryOfOrigin=KR'
	},
	{
		label: 'Most Popular',
		value: 'popular',
		path: '/search/manga?sort=POPULARITY_DESC'
	},
	{
		label: 'Top Rated',
		value: 'top',
		path: '/search/manga?sort=SCORE_DESC'
	}
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

export const reFormat = (string: string) => {
	if (string.length <= 2) return string;
	const removeSpecialCharacter = string.replace(/[_-]/g, ' ');
	return removeSpecialCharacter
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};
