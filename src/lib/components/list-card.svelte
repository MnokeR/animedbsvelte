<script lang="ts">
	type ListCardProps = {
		id: number;
		image: string;
		title: string;
		format: string;
	};
	let { id, image, title, format }: ListCardProps = $props();
</script>

<div class="flex flex-col">
	<div
		class="w-[180px] h-[254px] sm:w-[186px] sm:h-[262px] md:w-[200px] md:h-[282px] lg:w-[156px] lg:h-[220px] xl:w-[200px] xl:h-[282px] transition-all duration-200 ease-in-out flex flex-col"
	>
		<img src={image} alt={`${title} cover`} class="object-cover h-full w-full" />
	</div>
	<div class="w-[170px] sm:w-[186px] md:w-[200px] lg:w-[156px] xl:w-[200px]">
		<p class="truncate line-clamp-2 text-wrap">{title}</p>
	</div>
</div>
