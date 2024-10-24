<script lang="ts">
	let { children } = $props();
</script>

<main
	class="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden"
>
	{@render children()}
</main>
