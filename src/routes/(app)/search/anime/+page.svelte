<script lang="ts">
	import SearchResults from '../components/search-results.svelte';
	import type { LayoutData } from '../$types';
	import SearchFilter from '$lib/components/search/search-filter.svelte';
	import Loader from '$lib/components/loader.svelte';

	let { data }: { data: LayoutData } = $props();
</script>

<svelte:head>
	<title>Anime DB | Search Anime</title>
	<meta name="description" content="Discover new Animes or search for your favorites!" />
</svelte:head>
<SearchFilter mediaType="anime" />
{#if data.data}
	{#await data.data}
		<Loader />
	{:then result}
		<SearchResults data={result} />
	{:catch error}
		<p class="text-red-500">Failed to load data: {error.message}</p>
	{/await}
{:else}
	<div class="relative flex justify-center my-10">
		<div
			class="w-[511px] h-[590px] bg-center bg-no-repeat opacity-30"
			style="background-image: url('/images/anime-search.webp');"
		></div>
		<span class="absolute -bottom-0 h-20 w-full bg-gradient-to-b from-transparent to-background"
		></span>
	</div>
{/if}
