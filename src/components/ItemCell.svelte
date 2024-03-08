<script lang="ts">
	import type { Item } from '$lib/types';
	import Media from './Media.svelte';

	export let item: Item;
</script>

<div class="overflow-hidden w-44 max-h-1/6">
	{#each item.pictures as picture}
		<Media file={picture.url} alt={picture.filename} class="w-full h-full object-cover" />
	{/each}
</div>
