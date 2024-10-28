export type Anime = {
	trending: { media: AnimeShort[] };
	top: { media: AnimeShort[] };
	popular: { media: AnimeShort[] };
	season: { media: AnimeShort[] };
	nextSeason: { media: AnimeShort[] };
};

export type Manga = {
	trending: { media: AnimeShort[] };
	popular: { media: AnimeShort[] };
	manhwa: { media: AnimeShort[] };
	top: { media: AnimeShort[] };
};

export type AnimeShort = {
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

export type SearchResults = {
	data: { Page: { media: AnimeShort[]; pageInfo: PageInfo } };
};

export type PageInfo = {
	total: number;
	perPage: number;
	currentPage: number;
	lastPage: number;
	hasNextPage: boolean;
};

export type SearchVariables = {
	search: string | undefined;
	genres: string | undefined;
	year: string | undefined;
	season?: string | undefined;
	format: string | undefined;
	status: string | undefined;
	countryOfOrigin: string | undefined;
	isAdult: string | undefined;
	sort: string | undefined;
	yearRange: string | undefined;
	episodeRange: string | undefined;
	durationRange: string | undefined;
	chapterRange: string | undefined;
	volumeRange: string | undefined;
};

export type SearchableParams = {
	search: string;
	genres: string;
	year: string;
	season?: string;
	format: string;
	status: string;
	countryOfOrigin: string;
	isAdult: string;
	sort: string;
}[];

export type MediaPage = {
	data: { Media: MediaDetails };
};

export type MediaDetails = {
	id: string;
	title: { userPreferred: string; native: string; english: string };
	averageScore: number;
	bannerImage: string;
	chapters: number;
	coverImage: { extraLarge: string; large: string };
	countryOfOrigin: string;
	characterPreview: Characters;
	description: string;
	duration: number;
	episodes: number;
	format: string;
	genres: string[];
	meanScore: number;
	nextAiringEpisode: {
		airingAt: number;
		episode: number;
		timeUntilAiring: number;
	};
	recommendations: Recommendations;
	relations: Relations;
	season: string;
	seasonYear: number;
	source: string;
	startDate: { year: number; month: number; day: number };
	endDate: { year: number; month: number; day: number };
	status: string;
	studios: Studios;
	synonyms: string[];
	trailer: { id: string; site: string };
	type: string;
	volumes: number;
};

export type Characters = {
	edges: {
		id: number;
		role: string;
		name: { userPreferred: string };
		node: {
			id: number;
			image: { large: string };
			name: { userPreferred: string };
		};
	}[];
};

export type Relations = {
	edges: {
		id: number;
		relationType: string;
		node: {
			id: number;
			title: {
				userPreferred: string;
			};
			type: string;
			status: string;
			format: string;
			bannerImage: string;
			coverImage: {
				large: string;
			};
		};
	}[];
};

export type Studios = {
	edges: {
		isMain: boolean;
		node: {
			id: number;
			name: string;
		};
	}[];
};

export type Recommendations = {
	nodes: {
		id: number;
		rating: number;
		mediaRecommendation: {
			bannerImage: string;
			coverImage: { large: string };
			format: string;
			id: number;
			title: { userPreferred: string };
			type: string;
		};
	}[];
};
