<script lang="ts">
	import { scale } from 'svelte/transition';
	import Skeleton from './ui/skeleton/skeleton.svelte';

	type ListCardProps = {
		id: number;
		image: string;
		title: string;
		format: string;
	};
	let { id, image, title, format }: ListCardProps = $props();

	let imagesLoaded = $state(false);
</script>

<div class="flex flex-col">
	<div
		class="w-[180px] h-[254px] sm:w-[186px] sm:h-[262px] md:w-[200px] md:h-[282px] lg:w-[156px] lg:h-[220px] xl:w-[200px] xl:h-[282px] transition-all duration-200 ease-in-out flex flex-col"
	>
		{#if !imagesLoaded}
			<Skeleton class="w-full h-full" />
		{/if}
		{#key imagesLoaded}
			<img
				src={image}
				alt={`${title} cover`}
				width="282"
				height="200"
				class="object-cover h-full w-full {imagesLoaded ? 'visble' : 'hidden'}"
				onload={() => (imagesLoaded = true)}
				transition:scale
			/>
		{/key}
	</div>
	<div class="w-[170px] sm:w-[186px] md:w-[200px] lg:w-[156px] xl:w-[200px]">
		<p class="truncate line-clamp-2 text-wrap text-sm text-muted-foreground">{title}</p>
	</div>
</div>
