<script lang="ts">
	import { scale } from 'svelte/transition';
	import Skeleton from './ui/skeleton/skeleton.svelte';
	import { goto } from '$app/navigation';

	type ListCardProps = {
		id: number;
		image: string;
		title: string;
		format: string;
		type: string;
	};
	let { id, image, title, format, type }: ListCardProps = $props();

	let imagesLoaded = $state(false);
</script>

<div class="flex flex-col">
	<div class="flex flex-col">
		{#if !imagesLoaded}
			<Skeleton class="w-full h-full" />
		{/if}
		{#key imagesLoaded}
			<a href={`/${type.toLowerCase()}/${id}`}>
				<img
					src={image}
					alt={`${title} cover`}
					width="282"
					height="200"
					class="object-cover w-[180px] h-[254px] sm:w-[186px] sm:h-[262px] md:w-[200px] md:h-[282px] lg:w-[156px] lg:h-[220px] xl:w-[200px] xl:h-[282px] {imagesLoaded
						? 'visble'
						: 'hidden'}"
					onload={() => (imagesLoaded = true)}
					transition:scale
				/></a
			>
		{/key}
	</div>
	<div class="w-[170px] sm:w-[186px] md:w-[200px] lg:w-[156px] xl:w-[200px]">
		<p class="truncate line-clamp-2 text-wrap text-sm text-muted-foreground">{title}</p>
	</div>
</div>
