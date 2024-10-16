<script lang="ts">
	import { page } from '$app/stores';
	import ListCard from '$lib/components/list-card.svelte';
	import { BASE_URL } from '$lib/client/querys';
	import { getParams, searchOptions } from '$lib/client/utils';
	import type { SearchResults } from '$lib/types/query-ts';
	import InView from '$lib/components/inView.svelte';
	import Loader from 'lucide-svelte/icons/loader';

	let { data }: { data: SearchResults } = $props();

	let searchResults = $state([data.data.Page.media]);
	let pageInfo = $state(data.data.Page.pageInfo);
	let loadingMoreData = $state(false);
	const searchParams = $page.url.searchParams;
	const path = $page.url.pathname;
	const mediaType = $state(path === '/search/anime' ? 'Anime' : 'Manga');

	const loadMoreData = async () => {
		if (!pageInfo.hasNextPage || loadingMoreData) return;
		loadingMoreData = true;
		const params = getParams(searchParams);
		const loadMoreOption = searchOptions({ mediaType, params, pageInfo });
		const response = await fetch(BASE_URL, loadMoreOption);
		const data: SearchResults = await response.json();
		pageInfo = data.data.Page.pageInfo;
		searchResults.push(data.data.Page.media);
		loadingMoreData = false;
	};

	$effect(() => {
		data.data.Page;
		searchResults = [data.data.Page.media];
		pageInfo = data.data.Page.pageInfo;
	});
</script>

<div
	class="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden"
>
	<div class="flex flex-wrap justify-evenly gap-3 my-4">
		{#if searchResults[0].length}
			{#each searchResults as results}
				{#each results as result}
					<ListCard
						id={result.id}
						title={result.title.userPreferred}
						image={result.coverImage.large}
						format={result.format}
					/>
				{/each}
			{/each}
		{:else}
			<p>No results</p>
		{/if}
	</div>
</div>
<div class="flex justify-center items-center my-4">
	{#if pageInfo.hasNextPage && !loadingMoreData}
		<InView loadMore={loadMoreData} />
	{/if}
	{#if loadingMoreData}
		<Loader class="animate-spin" />
	{/if}
</div>
