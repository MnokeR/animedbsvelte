<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import ListGrid from '$lib/components/list-grid.svelte';
	import ListCard from '$lib/components/list-card.svelte';
	import type { PageData } from './$types';
	import type { Manga, Anime } from '$lib/types/query-ts';
	import { type Categories, animeCategories, mangaCategories } from '$lib/client/utils';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { data }: { data: PageData } = $props();
	let anime = $state(true),
		manga = $state<boolean>();

	function changeMedia() {
		anime ? (anime = !anime) : manga ? (manga = !manga) : null;
	}
</script>

<div class="flex justify-center gap-4">
	<Button size="sm" disabled={anime} onclick={changeMedia}>Anime</Button>
	<Button size="sm" disabled={manga} onclick={changeMedia}>Manga</Button>
</div>
{#snippet categories(categories: Categories, type: Anime | Manga)}
	<div class="flex flex-col gap-4">
		{#each categories as category}
			<ListGrid heading={category.label}>
				{#if type}
					{#each type[category.value as keyof typeof type].media as media}
						<ListCard
							id={media.id}
							title={media.title.userPreferred}
							image={media.coverImage.large}
							format={media.format}
						/>
					{/each}
				{/if}
			</ListGrid>
		{/each}
	</div>
{/snippet}

<div class="overflow-hidden">
	{#if anime && data.anime}
		<section
			in:fly={{ delay: 100, duration: 300, easing: cubicOut, x: '-100%', opacity: 1 }}
			out:fly={{ delay: 0, duration: 300, easing: cubicOut, x: '-100%', opacity: 1 }}
			onoutroend={() => (manga = true)}
		>
			{@render categories(animeCategories, data.anime)}
		</section>
	{:else if manga && data.manga}
		<section
			in:fly={{ delay: 100, duration: 300, easing: cubicOut, x: '100%', opacity: 1 }}
			out:fly={{ delay: 0, duration: 300, easing: cubicOut, x: '100%', opacity: 1 }}
			onoutroend={() => (anime = true)}
		>
			{@render categories(mangaCategories, data.manga)}
		</section>
	{/if}
</div>
