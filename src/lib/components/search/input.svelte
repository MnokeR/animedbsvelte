<script lang="ts">
	import { page } from '$app/stores';
	import { Input } from '../ui/input';
	type InputProps = {
		setParams: (param: string, value: string) => void;
	};
	const searchParams = $page.url.searchParams;
	let value = $state(searchParams.get('search') || '');
	let { setParams }: InputProps = $props();
</script>

<Input
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
