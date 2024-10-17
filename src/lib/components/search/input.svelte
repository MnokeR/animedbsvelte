<script lang="ts">
	import { page } from '$app/stores';
	import Search from 'lucide-svelte/icons/search';
	import { Input } from '../ui/input';
	type InputProps = {
		setParams: (param: string, value: string) => void;
	};
	const searchParams = $page.url.searchParams;
	let value = $state(searchParams.get('search') || '');
	let { setParams }: InputProps = $props();
</script>

<div class="relative">
	<Input
		class="text-sky-500 w-[408px] sm:w-[368px] pl-7"
		type="search"
		autocomplete="off"
		name="search"
		{value}
		placeholder="Search"
		oninput={(e) => {
			e.preventDefault();
			setParams('search', e.currentTarget.value);
		}}
	/>
	<span class="absolute top-3 left-2 text-muted-foreground"><Search class="h-4 w-4" /></span>
</div>
