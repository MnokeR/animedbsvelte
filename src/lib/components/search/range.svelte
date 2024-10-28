<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '../ui/button/button.svelte';
	import { Slider } from '../ui/slider';
	import X from 'lucide-svelte/icons/x';
	import { page } from '$app/stores';
	import type { RangeType } from './range-options';

	type RangeProps = {
		setParams: (param: string, value: string | string[]) => void;
		options: RangeType;
	};

	let { setParams, options }: RangeProps = $props();
	const searchParams = $page.url.searchParams;

	let value = $state(
		searchParams.get(options.param)?.split(',').map(Number) || [options.min, options.max]
	);
	function onValueChange() {
		if (value[0] === options.min && value[1] === options.max) return onClear();
		setParams(options.param, value.toString());
		window.removeEventListener('pointerup', onValueChange);
	}
	function onClear() {
		value = [options.min, options.max];
		setParams(options.param, '');
	}

	function onSliderStart() {
		window.addEventListener('pointerup', onValueChange);
	}
</script>

<div class="flex flex-col w-full sm:w-[180px] gap-2 py-2 text-muted-foreground text-sm">
	<div class="flex justify-between items-center">
		<p>{options.label}</p>
		{#if value[0] !== options.min || value[1] !== options.max}
			<p class="flex items-center text-xs text-sky-500" transition:fade={{ duration: 200 }}>
				{value[0] + '-' + value[1]}
				<Button variant="ghost" size="icon" class="w-5 h-5" onclick={onClear}
					><X class="h-4 w-4 text-red-500" /></Button
				>
			</p>
		{/if}
	</div>
	<div class="relative h-[40px] flex items-end pb-3 justify-center gap-5">
		<p
			class={`absolute -top-0 left-0 text-xs ${value[0] === options.min ? 'text-muted-foreground' : 'text-sky-500'}`}
		>
			{value[0]}
		</p>
		<Slider bind:value min={options.min} max={options.max} onValueChange={onSliderStart}></Slider>
		<p
			class={`absolute -top-0 right-0 text-xs ${value[1] === options.max ? 'text-muted-foreground' : 'text-sky-500'}`}
		>
			{value[1]}
		</p>
	</div>
</div>
