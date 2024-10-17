<script lang="ts">
	import Header from '$lib/components/header/header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Header />
<main
	class="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden"
>
	{@render children()}
</main>
