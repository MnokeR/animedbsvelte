<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SearchFilter from '$lib/components/search/search-filter.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Snippet } from 'svelte';

	type LayoutProps = {
		children: Snippet;
	};
	let { children }: LayoutProps = $props();
	const path = $state($page.url.pathname);
	let mediaType = $state<'anime' | 'manga'>(path === '/search/anime' ? 'anime' : 'manga');

	const handleClick = (media: 'anime' | 'manga') => {
		mediaType = media;
		goto(`${media}`, { replaceState: true, invalidateAll: true });
	};
</script>

<div class="max-w-screen-xl mx-auto">
	<div class="relative flex gap-4 border-b-2 border-sky-500 pl-2 my-4">
		<Button
			size="sm"
			variant="ghost"
			disabled={mediaType === 'anime'}
			onclick={() => handleClick('anime')}>Anime</Button
		>
		<Button
			size="sm"
			variant="ghost"
			disabled={mediaType === 'manga'}
			onclick={() => handleClick('manga')}>Manga</Button
		>
	</div>
</div>
<SearchFilter {mediaType} />

{@render children()}
