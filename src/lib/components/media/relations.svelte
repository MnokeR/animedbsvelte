<script lang="ts">
	import { reFormat } from '$lib/client/utils';
	import type { Relations } from '$lib/types/query-ts';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';

	let { relations }: { relations: Relations } = $props();
	const relationTypes = [
		'SOURCE',
		'PREQUEL',
		'SEQUEL',
		'ADAPTATION',
		'ALTERNATIVE',
		'SPIN_OFF',
		'SIDE_STORY',
		'SUMMARY',
		'CHARACTER',
		'OTHER'
	];

	const sortedRelations = relations.edges.sort((a, b) => {
		const indexA = relationTypes.indexOf(a.relationType);
		const indexB = relationTypes.indexOf(b.relationType);
		const adjustedIndexA = indexA === -1 ? relationTypes.length : indexA;
		const adjustedIndexB = indexB === -1 ? relationTypes.length : indexB;
		return adjustedIndexA - adjustedIndexB;
	});
</script>

<section class="bg-secondary/60 p-4 m-2 rounded-md">
	<h2 class="text-muted-foreground text-lg mb-2 font-semibold">Relations</h2>
	<ScrollArea orientation="horizontal">
		<div class="flex w-full gap-2 py-2">
			{#each sortedRelations as relation}
				<div class="relative flex flex-col w-[120px]">
					<a href={`/${relation.node.type.toLowerCase()}/${relation.node.id}`}>
						<img
							src={relation.node.coverImage.large}
							width="230"
							height="345"
							alt={`Cover image for ${relation.node.title.userPreferred}`}
							class="w-[120px] h-[180px]"
						/>
					</a>
					<a
						href={`/${relation.node.type.toLowerCase()}/${relation.node.id}`}
						class="text-sm text-muted-foreground text-wrap line-clamp-2"
					>
						{relation.node.title.userPreferred}
					</a>
					<span class="absolute top-0 right-0 left-0 bg-secondary/80 text-center py-0.5 text-sm">
						{reFormat(relation.relationType)}
					</span>
				</div>
			{/each}
		</div>
	</ScrollArea>
</section>
