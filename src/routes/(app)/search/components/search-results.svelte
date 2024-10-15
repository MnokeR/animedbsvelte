<script lang="ts">
	import ListCard from '$lib/components/list-card.svelte';
	import type { SearchResults } from '$lib/types/query-ts';

	let { data }: { data: SearchResults } = $props();
	const searchResults = data.data.Page.media;
	const pageInfo = data.data.Page.pageInfo;
</script>

<div
	class="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden"
>
	<div class="flex flex-wrap justify-evenly gap-3 my-4">
		{#if searchResults.length}
			{#each searchResults as result}
				<ListCard
					id={result.id}
					title={result.title.userPreferred}
					image={result.coverImage.large}
					format={result.format}
				/>
			{/each}
		{:else}
			<p>No results</p>
		{/if}
	</div>
</div>
