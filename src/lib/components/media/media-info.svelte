<script lang="ts">
	import type { MediaDetails } from '$lib/types/query-ts';
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
		<img src={media.bannerImage} alt="Banner" />
	</section>
{/if}

<Description {media} />
<Information {media} />
<Characters characters={media.characterPreview} />
<Relations relations={media.relations} />
<Recommendations recommendations={media.recommendations} />
{#if media.trailer}
	<Trailer trailer={media.trailer} />
{/if}
