<script lang="ts">
	import { reFormat } from '$lib/client/utils';
	import type { MediaDetails } from '$lib/types/query-ts';

	let { media }: { media: MediaDetails } = $props();
</script>

{#snippet info(title: string, info: string | number, format = true)}
	{#if info}
		<div class="">
			<p class="text-muted-foreground font-semibold">{title}</p>
			<p class="text-sm text-muted-foreground">
				{format && typeof info === 'string' ? reFormat(info) : info}
			</p>
		</div>
	{/if}
{/snippet}

<section class="m-2 bg-secondary/60 rounded-md p-4 flex">
	<div class="flex-none">
		{@render info('Native', media?.title?.native, false)}
		{@render info('Romaji', media?.title?.userPreferred, false)}
		{@render info('English', media?.title?.english, false)}

		{@render info('Status', media?.status)}
		{@render info('Next Episode', media?.nextAiringEpisode?.episode)}
		{@render info('Episodes', media?.episodes, false)}
		{@render info('Format', media?.format)}
		{@render info('Source', media?.source)}
	</div>
</section>
