<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import ListCard from '$lib/components/list-card.svelte';
	import type { Manga, Anime } from '$lib/types/query-ts';
	import { type Categories, animeCategories, mangaCategories } from '$lib/client/utils';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Loader from '$lib/components/loader.svelte';

	let { data } = $props();
	let mediaType = $state<'Anime' | 'Manga'>('Anime');

	function changeMedia() {
		mediaType = mediaType === 'Anime' ? 'Manga' : 'Anime';
		sessionStorage.setItem('mediaType', mediaType);
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			const savedMediaType = sessionStorage.getItem('mediaType');
			if (savedMediaType) {
				mediaType = savedMediaType as 'Anime' | 'Manga';
			}
		}
	});
</script>

<svelte:head>
	<title>Anime DB Svelte</title>
	<meta name="description" content="Anime DB build using Svelte 5" />
</svelte:head>

{#snippet categories(categories: Categories, type: Anime | Manga)}
	<div class="flex flex-col gap-4">
		{#each categories as category}
			<div>
				<div class="m-2 flex justify-between items-center">
					<h2 class="text-lg font-semibold text-muted-foreground">{category.label}</h2>
					<a
						href={category.path}
						class="opacity-80 hover:opacity-100 transition-opacity duration-150 ease-in-out text-sky-500"
						>View All</a
					>
				</div>
				<div class="flex flex-wrap justify-evenly gap-3">
					{#if type}
						{#each type[category.value as keyof typeof type].media as media}
							<ListCard
								id={media.id}
								title={media.title.userPreferred}
								image={media.coverImage.large}
								format={media.format}
								type={media.type}
							/>
						{/each}
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/snippet}
<div class="relative flex gap-4 border-b-2 border-sky-500 pl-2 my-4">
	<Button size="sm" variant="ghost" disabled={mediaType === 'Anime'} onclick={changeMedia}
		>Anime</Button
	>
	<Button size="sm" variant="ghost" disabled={mediaType === 'Manga'} onclick={changeMedia}
		>Manga</Button
	>
</div>
{#await data.data}
	<Loader />
{:then data}
	{#if mediaType === 'Anime' && data?.anime.data}
		<section
			in:fly={{ delay: 100, duration: 200, easing: cubicOut, x: '-100%', opacity: 1 }}
			out:fly={{ delay: 0, duration: 200, easing: cubicOut, x: '-100%', opacity: 1 }}
			onoutroend={() => (mediaType = 'Manga')}
		>
			{@render categories(animeCategories, data.anime.data)}
		</section>
	{:else if mediaType === 'Manga' && data?.manga.data}
		<section
			in:fly={{ delay: 100, duration: 200, easing: cubicOut, x: '100%', opacity: 1 }}
			out:fly={{ delay: 0, duration: 200, easing: cubicOut, x: '100%', opacity: 1 }}
			onoutroend={() => (mediaType = 'Anime')}
		>
			{@render categories(mangaCategories, data.manga.data)}
		</section>
	{/if}
{/await}
