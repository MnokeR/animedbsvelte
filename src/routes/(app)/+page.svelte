<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import ListCard from '$lib/components/list-card.svelte';
	import type { PageData } from './$types';
	import type { Manga, Anime } from '$lib/types/query-ts';
	import { type Categories, animeCategories, mangaCategories } from '$lib/client/utils';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Loader from '$lib/components/loader.svelte';
	let { data }: { data: PageData } = $props();
	let anime = $state(true),
		manga = $state<boolean>();

	function changeMedia() {
		anime ? (anime = !anime) : manga ? (manga = !manga) : null;
	}
</script>

<svelte:head>
	<title>Anime DB Svelte</title>
	<meta name="description" content="Anime DB build using Svelte 5" />
</svelte:head>

{#snippet categories(categories: Categories, type: Anime | Manga)}
	<div class="flex flex-col gap-4">
		{#each categories as category}
			<div>
				<h2 class="ml-2 mb-2">{category.label}</h2>
				<div class="flex flex-wrap justify-evenly gap-3">
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
				</div>
			</div>
		{/each}
	</div>
{/snippet}

<div class="relative flex gap-4 border-b-2 border-sky-500 pl-2 my-4">
	<Button size="sm" variant="ghost" disabled={anime} onclick={changeMedia}>Anime</Button>
	<Button size="sm" variant="ghost" disabled={manga} onclick={changeMedia}>Manga</Button>
</div>
{#await data.data}
	<Loader />
{:then data}
	{console.log(data)}
	{#if anime && data?.anime.data}
		<section
			in:fly={{ delay: 100, duration: 200, easing: cubicOut, x: '-100%', opacity: 1 }}
			out:fly={{ delay: 0, duration: 200, easing: cubicOut, x: '-100%', opacity: 1 }}
			onoutroend={() => (manga = true)}
		>
			{@render categories(animeCategories, data.anime.data)}
		</section>
	{:else if manga && data?.manga.data}
		<section
			in:fly={{ delay: 100, duration: 200, easing: cubicOut, x: '100%', opacity: 1 }}
			out:fly={{ delay: 0, duration: 200, easing: cubicOut, x: '100%', opacity: 1 }}
			onoutroend={() => (anime = true)}
		>
			{@render categories(mangaCategories, data.manga.data)}
		</section>
	{/if}
{/await}
