<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { debounce } from '$lib/debounce';
	import Input from './input.svelte';
	import {
		selectAnimeFormat,
		selectAnimeStatus,
		selectCountry,
		selectGenres,
		selectMangaFormat,
		selectMangaStatus,
		selectSeason,
		selectSort,
		selectYears,
		type Options
	} from './select-options';
	import Select from './select.svelte';
	type SearchFilterProps = {
		mediaType: 'anime' | 'manga';
	};
	let { mediaType }: SearchFilterProps = $props();
	const searchParams = $state($page.url.searchParams);

	const setParams = (param: string, value: string | string[]) => {
		if (value.toString() === '') {
			searchParams.delete(param);
		} else {
			searchParams.set(param, value.toString());
		}
		goto(`?${searchParams.toString()}`, { keepFocus: true, invalidateAll: true });
	};

	const debounceSearch = debounce(setParams, 600);
</script>

{#snippet select(options: Options, multiple = false, debounce = false)}
	<Select
		{options}
		multiple={multiple ? true : false}
		setParams={debounce ? debounceSearch : setParams}
	/>
{/snippet}
<section class="flex flex-col items-center justify-center gap-2">
	<div class="max-w-[400px]">
		<Input setParams={debounceSearch} />
	</div>
	<div class="flex flex-wrap gap-2 justify-center">
		{@render select(selectGenres, true, true)}
		{@render select(selectYears)}
		{#if mediaType === 'anime'}
			{@render select(selectSeason)}
			{@render select(selectAnimeFormat)}
			{@render select(selectAnimeStatus)}
		{/if}
		{#if mediaType === 'manga'}
			{@render select(selectMangaFormat)}
			{@render select(selectMangaStatus)}
		{/if}
		{@render select(selectCountry)}
		{@render select(selectSort)}
	</div>
</section>
