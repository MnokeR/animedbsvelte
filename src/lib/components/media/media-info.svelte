<script lang="ts">
	import type { MediaDetails } from '$lib/types/query-ts';
	import LazyLoad from '../lazy-load.svelte';
	import {
		Characters,
		Description,
		Information,
		Recommendations,
		Relations,
		Trailer
	} from './index';

	let { media }: { media: MediaDetails } = $props();
</script>

{#if media.bannerImage}
	<section class="hidden md:block">
		<img src={media.bannerImage} alt="Banner" class="w-full max-h-[270px] object-cover" />
	</section>
{/if}

<Description {media} />
<Information {media} />
<Characters characters={media.characterPreview} />
<Relations relations={media.relations} />
<Recommendations recommendations={media.recommendations} />
{#if media.trailer}
	<LazyLoad>
		<Trailer trailer={media.trailer} />
	</LazyLoad>
{/if}
