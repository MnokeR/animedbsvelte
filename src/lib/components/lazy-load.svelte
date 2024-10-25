<script lang="ts">
	import type { Snippet } from 'svelte';

	let shouldLoadComponent = $state(false);
	let observer: IntersectionObserver;
	let sentinal: HTMLDivElement;

	let { children }: { children: Snippet } = $props();

	const onIntersect = (entries: IntersectionObserverEntry[]) => {
		const [entry] = entries;
		if (entry.isIntersecting) {
			shouldLoadComponent = true;
			observer.unobserve(sentinal);
		}
	};

	$effect(() => {
		observer = new IntersectionObserver(onIntersect, {
			root: null,
			rootMargin: '0px',
			threshold: 0
		});
		observer.observe(sentinal);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div bind:this={sentinal}></div>

{#if shouldLoadComponent}
	{@render children()}
{/if}
