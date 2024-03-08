<script lang="ts">
	import type { Item } from '$lib/types';
	import Media from './Media.svelte';

	export let item: Item;
</script>

<div class="flex flex-row flex-grow max-w-44 h-full">
	{#each item.pictures as picture}
		<Media file={picture.url} alt={picture.filename} class="w-full h-full object-cover" />
	{/each}
</div>
