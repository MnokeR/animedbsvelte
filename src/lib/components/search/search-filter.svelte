<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { debounce } from '$lib/debounce';
	import Input from './input.svelte';
	import Range from './range.svelte';
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
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Select from './select.svelte';
	import Filter from 'lucide-svelte/icons/filter';
	import {
		chapterRange,
		durationRange,
		episodeRange,
		volumeRange,
		yearRange
	} from './range-options';
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
<div class="bg-secondary/40 p-2 border border-border rounded-md">
	<Collapsible.Root>
		<div class="flex flex-col gap-2">
			<div class="flex justify-between gap-2">
				<Input setParams={debounceSearch} />
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" size="icon">
						<Filter class="h-4 w-4 text-muted-foreground" />
						<span class="sr-only">Toggle</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content>
				<div class="flex flex-wrap gap-2 justify-center md:justify-stretch items-center">
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
				<div class="flex flex-col sm:flex-row justify-evenly mx-2">
					<Range setParams={debounceSearch} options={yearRange} />
					{#if mediaType === 'anime'}
						<Range setParams={debounceSearch} options={episodeRange} />
						<Range setParams={debounceSearch} options={durationRange} />
					{/if}
					{#if mediaType === 'manga'}
						<Range setParams={debounceSearch} options={chapterRange} />
						<Range setParams={debounceSearch} options={volumeRange} />
					{/if}
				</div>
			</Collapsible.Content>
		</div>
	</Collapsible.Root>
</div>
