export type Options = {
	search?: boolean;
	title: string;
	items: {
		label: string;
		value: string;
	}[];
};

const year = new Date().getFullYear();
const years: { label: string; value: string }[] = [];
for (let i = year + 1; i >= 1940; i--) {
	years.push({ label: String(i), value: String(i) });
}
export const selectYears: Options = {
	search: true,
	title: 'Year',
	items: years
};

type year = keyof typeof selectYears;

export const selectSeason: Options = {
	title: 'Season',
	items: [
		{ label: 'Winter', value: 'WINTER' },
		{ label: 'Spring', value: 'SPRING' },
		{ label: 'Summer', value: 'SUMMER' },
		{ label: 'Fall', value: 'FALL' }
	]
};

export const selectGenres: Options = {
	search: true,
	title: 'Genres',
	items: [
		{ label: 'Action', value: 'Action' },
		{ label: 'Adventure', value: 'Adventure' },
		{ label: 'Comedy', value: 'Comedy' },
		{ label: 'Drama', value: 'Drama' },
		{ label: 'Ecchi', value: 'Ecchi' },
		{ label: 'Fantasy', value: 'Fantasy' },
		{ label: 'Horror', value: 'Horror' },
		{ label: 'Mahou Shoujo', value: 'Mahou Shoujo' },
		{ label: 'Mecha', value: 'Mecha' },
		{ label: 'Music', value: 'Music' },
		{ label: 'Mystery', value: 'Mystery' },
		{ label: 'Psychological', value: 'Psychological' },
		{ label: 'Romance', value: 'Romance' },
		{ label: 'Slice of Life', value: 'Slice of Life' },
		{ label: 'Sports', value: 'Sports' },
		{ label: 'Supernatural', value: 'Supernatural' },
		{ label: 'Thriller', value: 'Thriller' }
	]
};

export const selectAnimeFormat: Options = {
	title: 'Format',
	items: [
		{ label: 'TV Show', value: 'TV' },
		{ label: 'Movie', value: 'MOVIE' },
		{ label: 'TV Short', value: 'TV_SHORT' },
		{ label: 'Special', value: 'SPECIAL' },
		{ label: 'OVA', value: 'OVA' },
		{ label: 'ONA', value: 'ONA' },
		{ label: 'Music', value: 'MUSIC' }
	]
};

export const selectMangaFormat: Options = {
	title: 'Format',
	items: [
		{ label: 'Manga', value: 'MANGA' },
		{ label: 'Light Novel', value: 'NOVEL' },
		{ label: 'One Shot', value: 'ONE_SHOT' }
	]
};

export const selectAnimeStatus: Options = {
	title: 'Airing Status',
	items: [
		{ label: 'Airing', value: 'RELEASING' },
		{ label: 'Finished', value: 'FINISHED' },
		{ label: 'Coming Soon', value: 'NOT_YET_RELEASED' },
		{ label: 'Cancelled', value: 'CANCELLED' }
	]
};

export const selectMangaStatus: Options = {
	title: 'Publishing Status',
	items: [
		{ label: 'Releasing', value: 'RELEASING' },
		{ label: 'Finished', value: 'FINISHED' },
		{ label: 'Coming Soon', value: 'NOT_YET_RELEASED' },
		{ label: 'Hiatus', value: 'HIATUS' },
		{ label: 'Cancelled', value: 'CANCELLED' }
	]
};

export const selectCountry: Options = {
	title: 'Country',
	items: [
		{ label: 'Japan', value: 'JP' },
		{ label: 'Korea', value: 'KR' },
		{ label: 'China', value: 'CN' },
		{ label: 'Taiwan', value: 'TW' }
	]
};

export const selectSort: Options = {
	title: 'Sort',
	items: [
		{ label: 'Popularity', value: 'POPULARITY_DESC' },
		{ label: 'Trending', value: 'TRENDING_DESC' },
		{ label: 'Score', value: 'SCORE_DESC' }
	]
};
