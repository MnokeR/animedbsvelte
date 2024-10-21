<script lang="ts">
	import SearchResults from '../components/search-results.svelte';
	import SearchFilter from '$lib/components/search/search-filter.svelte';
	import Loader from '$lib/components/loader.svelte';
	import SearchBg from '$lib/svg/search-bg.svelte';

	let { data } = $props();
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
		<SearchBg />
	</div>
{/if}
