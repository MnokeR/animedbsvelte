<script lang="ts">
	type TrailerProps = {
		trailer: {
			id: string;
			site: string;
		};
	};
	let { trailer }: TrailerProps = $props();
</script>

<section class="bg-secondary/60 p-4 rounded-md m-2">
	<h2 class="text-muted-foreground text-lg mb-2 font-semibold">Trailer</h2>
	<div class="flex">
		<iframe
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${trailer.id}`}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
</section>
