<script lang="ts">
	import { reFormat } from '$lib/client/utils';
	import type { Characters } from '$lib/types/query-ts';
	import Badge from '../ui/badge/badge.svelte';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';

	let { characters }: { characters: Characters } = $props();
</script>

<section class="bg-secondary/60 p-4 m-2 rounded-md">
	<h2 class="text-muted-foreground text-lg mb-2 font-semibold">Characters</h2>
	<ScrollArea orientation="horizontal">
		<div class="flex w-full gap-2 py-2">
			{#each characters.edges as character}
				<div class="relative flex flex-col w-[120px]">
					<img
						src={character.node.image.large}
						width="230"
						height="345"
						alt={`Cover image for ${character.node.name.userPreferred}`}
						class="w-[120px] h-[180px]"
					/>
					<p class="text-sm text-muted-foreground text-wrap line-clamp-2">
						{character.node.name.userPreferred}
					</p>
					<span class="absolute top-0 right-0 left-0 bg-secondary/80 py-0.5 text-center text-sm"
						>{reFormat(character.role)}</span
					>
				</div>
			{/each}
		</div>
	</ScrollArea>
</section>
