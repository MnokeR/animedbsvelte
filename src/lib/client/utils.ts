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
