export type RangeType = {
	min: number;
	max: number;
	label: string;
	param: string;
};
const year = new Date().getFullYear();
export const yearRange: RangeType = {
	min: 1940,
	max: year + 1,
	label: 'Year Range',
	param: 'yearRange'
};
export const episodeRange: RangeType = {
	min: 1,
	max: 200,
	label: 'Episodes',
	param: 'episodeRange'
};
export const durationRange: RangeType = {
	min: 1,
	max: 170,
	label: 'Duration',
	param: 'durationRange'
};
export const chapterRange: RangeType = {
	min: 1,
	max: 500,
	label: 'Chapters',
	param: 'chapterRange'
};
export const volumeRange: RangeType = { min: 1, max: 50, label: 'Volumes', param: 'volumeRange' };
