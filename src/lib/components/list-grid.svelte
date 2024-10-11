<script lang="ts">
	import type { Snippet } from 'svelte';

	type GridPorps = {
		children: Snippet;
		heading: string;
	};

	let { children, heading }: GridPorps = $props();
</script>

<div class="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
	<h2 class="ml-2 mb-2">{heading}</h2>
	<div class="flex flex-wrap justify-evenly gap-3">
		{@render children()}
	</div>
</div>
