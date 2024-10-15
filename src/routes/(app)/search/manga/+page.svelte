<script lang="ts">
	import Loader from 'lucide-svelte/icons/loader';
	import SearchResults from '../components/search-results.svelte';
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();
</script>

{#if data.data}
	{#await data.data}
		<div class="flex justify-center my-4">
			<Loader class="text-slate-500 text-center animate-spin" />
		</div>
	{:then result}
		<SearchResults data={result} />
	{:catch error}
		<p class="text-red-500">Failed to load data: {error.message}</p>
	{/await}
{/if}
