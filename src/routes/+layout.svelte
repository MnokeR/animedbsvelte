<script lang="ts">
	import Header from '$lib/components/header/header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Header />
<main>{@render children()}</main>
