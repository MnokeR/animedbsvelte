<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = SliderPrimitive.Props;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = [0];
	export { className as class };
</script>

<SliderPrimitive.Root
	bind:value
	class={cn('relative flex w-full touch-none select-none items-center', className)}
	{...$$restProps}
	let:thumbs
>
	<span class="bg-secondary relative h-1 w-full grow overflow-hidden rounded-full">
		<SliderPrimitive.Range class="bg-sky-500 absolute h-full" />
	</span>
	{#each thumbs as thumb}
		<SliderPrimitive.Thumb
			{thumb}
			class="ring-1 ring-background/50 bg-sky-500 ring-offset-background focus-visible:ring-ring block h-3.5 w-3.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 cursor-grab"
		/>
	{/each}
</SliderPrimitive.Root>
