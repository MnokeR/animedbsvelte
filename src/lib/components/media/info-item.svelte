<script lang="ts">
	import { reFormat } from '$lib/client/utils';
	import type { Snippet } from 'svelte';
	type InfoItemsProps = {
		label: string;
		info?: string | number | {};
		format?: boolean;
		children?: Snippet;
	};
	let { children, label, info, format }: InfoItemsProps = $props();
</script>

{#if children || (info && info !== null)}
	<div class="mb-1 flex justify-between items-center bg-secondary px-2 py-1.5 rounded-md">
		<p class="flex-none w-32 text-muted-foreground font-semibold">{label}</p>
		{#if info}
			{#if typeof info === 'object'}
				<p class="flex-1 text-sm text-muted-foreground">
					{#each Object.entries(info) as [key, value]}
						{`${reFormat(key)} ${value === null ? '-' : format && typeof value === 'string' ? reFormat(value) : value} `}
					{/each}
				</p>
			{:else}
				<p class="flex-1 text-sm text-muted-foreground">
					{format && typeof info === 'string' ? reFormat(info) : info}
				</p>
			{/if}
		{:else if children}
			{@render children()}
		{/if}
	</div>
{/if}
