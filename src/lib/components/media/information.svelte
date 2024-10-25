<script lang="ts">
	import { reFormat } from '$lib/client/utils';
	import type { MediaDetails } from '$lib/types/query-ts';
	import { countDown } from '$lib/utils/index';
	import Badge from '../ui/badge/badge.svelte';

	let { media }: { media: MediaDetails } = $props();
	const nextEpisodeDate = media?.nextAiringEpisode?.airingAt;
	const currentDate = Math.floor(Date.now() / 1000);
	const timeTillNextEpisode = nextEpisodeDate - currentDate;
	let nextEpisodeTimer = $state('');

	countDown(timeTillNextEpisode, (time) => {
		nextEpisodeTimer = `${time.days} : ${time.hours < 10 ? '0' + time.hours : time.hours} : ${time.minutes < 10 ? '0' + time.minutes : time.minutes} : ${time.seconds < 10 ? '0' + time.seconds : time.seconds}`;
	});
</script>

{#snippet info(title: string, info: string | number, format = true)}
	{#if info}
		<div class="mb-1 flex justify-between items-center bg-secondary p-2 rounded-md">
			<p class="flex-none w-32 text-muted-foreground font-semibold">{title}</p>
			<p class="flex-1 text-sm text-muted-foreground">
				{format && typeof info === 'string' ? reFormat(info) : info}
			</p>
		</div>
	{/if}
{/snippet}

<section class="m-2 bg-secondary/60 rounded-md p-4 flex">
	<div class="flex md:gap-4 flex-col md:flex-row w-full">
		<div class="flex-1">
			{@render info('Status', media?.status)}
			{#if media.nextAiringEpisode !== null}
				<div class="mb-1 flex justify-between items-center bg-secondary p-2 rounded-md">
					<p class="flex-none w-32 text-muted-foreground font-semibold">Next Episode</p>
					<p class="flex-1 text-sm text-muted-foreground">
						{media.nextAiringEpisode.episode}
						<Badge
							variant="outline"
							class="text-sky-700 bg-sky-200 dark:text-sky-200 dark:bg-sky-700 ml-2"
							>{nextEpisodeTimer}</Badge
						>
					</p>
				</div>
			{/if}
			{@render info('Episodes', media?.episodes, false)}
			{@render info('Format', media?.format)}
			{@render info('Source', media?.source)}
			{@render info('Season', media?.season)}
			{@render info('Year', media?.seasonYear)}
			{@render info('Season', media?.chapters)}
		</div>
		<div class="flex-1">
			{@render info('Native', media?.title?.native, false)}
			{@render info('Romaji', media?.title?.userPreferred, false)}
			{@render info('English', media?.title?.english, false)}
			{@render info('Country', media?.countryOfOrigin)}
			<div class="mb-1 flex justify-between items-center bg-secondary p-2 rounded-md">
				<p class="flex-none w-32 text-muted-foreground font-semibold">Studios</p>
				<div class="flex-1">
					{#each media.studios.edges as item}
						<p class="text-sm text-muted-foreground">{item.node.name}</p>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
