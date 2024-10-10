<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import X from 'lucide-svelte/icons/x';
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	type TriggerProps = SelectPrimitive.TriggerProps & {
		isActive: boolean;
		children: Snippet<[]>;
		handleClear: () => void;
	};

	export { className as class };
	let { class: className, children, isActive, handleClear, ...rest }: TriggerProps = $props();
</script>

<SelectPrimitive.Trigger
	class={cn(
		'border-input bg-background ring-offset-background focus-visible:ring-ring aria-[invalid]:border-destructive data-[placeholder]:[&>span]:text-muted-foreground flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		className
	)}
	{...rest}
	let:builder
>
	{@render children()}
	<div>
		{#if isActive}
			<X
				class="h-4 w-4 opacity-80"
				onclick={(e) => {
					e.stopPropagation;
					handleClear();
				}}
			/>
		{:else}
			<ChevronDown class="h-4 w-4 opacity-50" />
		{/if}
	</div>
</SelectPrimitive.Trigger>
