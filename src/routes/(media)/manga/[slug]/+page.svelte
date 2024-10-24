<script lang="ts">
	import Loader from '$lib/components/loader.svelte';
	import MediaInfo from '$lib/components/media/media-info.svelte';

	let { data } = $props();
</script>

{#if data.data}
	{#await data.data}
		<Loader />
	{:then media}
		<MediaInfo media={media.data.Media} />
	{/await}
{/if}
