<script lang="ts">
	import type { Recommendations } from '$lib/types/query-ts';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';

	let { recommendations }: { recommendations: Recommendations } = $props();
</script>

<section class="bg-secondary/60 p-4 m-2 rounded-md">
	<h2 class="text-muted-foreground text-lg mb-2 font-semibold">Recommendations</h2>
	<ScrollArea orientation="horizontal">
		<div class="flex w-full gap-2 py-2">
			{#each recommendations.nodes as recommendation}
				<div class="relative flex flex-col w-[120px]">
					<a
						href={`/${recommendation.mediaRecommendation.type.toLowerCase()}/${recommendation.mediaRecommendation.id}`}
					>
						<img
							src={recommendation.mediaRecommendation.coverImage.large}
							width="230"
							height="345"
							alt={`Cover image for ${recommendation.mediaRecommendation.title.userPreferred}`}
							class="w-[120px] h-[180px]"
						/>
					</a>
					<a
						href={`/${recommendation.mediaRecommendation.type.toLowerCase()}/${recommendation.mediaRecommendation.id}`}
					>
						<p class="text-sm text-muted-foreground text-wrap line-clamp-2">
							{recommendation.mediaRecommendation.title.userPreferred}
						</p>
					</a>
					<span class="absolute top-0 right-0 left-0 bg-secondary/80 py-0.5 text-center text-sm"
						>{recommendation.rating}</span
					>
				</div>
			{/each}
		</div>
	</ScrollArea>
</section>
