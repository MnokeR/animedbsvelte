<script lang="ts">
	import { reFormat } from '$lib/client/utils';
	import type { MediaDetails } from '$lib/types/query-ts';
	import { countDown } from '$lib/utils/index';
	import { episodeRange } from '../search/range-options';
	import Badge from '../ui/badge/badge.svelte';
	import { InfoItem } from './index';

	let { media }: { media: MediaDetails } = $props();
	const nextEpisodeDate = media?.nextAiringEpisode?.airingAt;
	const currentDate = Math.floor(Date.now() / 1000);
	const timeTillNextEpisode = nextEpisodeDate - currentDate;
	let nextEpisodeTimer = $state('');

	countDown(timeTillNextEpisode, (time) => {
		nextEpisodeTimer = `${time.days} : ${time.hours < 10 ? '0' + time.hours : time.hours} : ${time.minutes < 10 ? '0' + time.minutes : time.minutes} : ${time.seconds < 10 ? '0' + time.seconds : time.seconds}`;
	});
	console.log(media);
</script>

<section class="m-2 bg-secondary/60 rounded-md p-4 flex">
	<div class="flex md:gap-4 flex-col md:flex-row w-full">
		<div class="flex-1">
			<InfoItem label="Status" info={media.status} format />
			{#if media.nextAiringEpisode !== null}
				<InfoItem label="Next Episode">
					<p class="flex-1 text-sm text-muted-foreground">
						{media.nextAiringEpisode.episode}
						<Badge
							variant="outline"
							class="text-sky-700 bg-sky-200 dark:text-sky-200 dark:bg-sky-700 ml-2"
							>{nextEpisodeTimer}</Badge
						>
					</p>
				</InfoItem>
			{/if}

			<InfoItem label="Episodes" info={media.episodes} />
			<InfoItem label="Format" info={media.format} format />
			<InfoItem label="Source" info={media.source} format />
			<InfoItem label="Chapters" info={media.chapters} />
			<InfoItem label="Volumes" info={media.volumes} />
			<InfoItem label="Year" info={media.seasonYear} />
			<InfoItem label="Season" info={media.season} format />
			<InfoItem label="Start Date" info={media.startDate} />
			<InfoItem label="End Date" info={media.endDate} />
		</div>
		<div class="flex-1">
			<InfoItem label="Native" info={media.title.native} />
			<InfoItem label="Romaji" info={media.title.userPreferred} />
			<InfoItem label="English" info={media.title.english} />
			<InfoItem label="Country" info={media.countryOfOrigin} />

			{#if media.studios.edges.length > 0}
				<InfoItem label="Studios">
					<div class="flex-1">
						{#each media.studios.edges as item}
							<p class="text-sm text-muted-foreground">
								{item.node.name}
								{#if item.isMain}
									<span class="text-sky-500">Main</span>
								{/if}
							</p>
						{/each}
					</div>
				</InfoItem>
			{/if}
		</div>
	</div>
</section>
