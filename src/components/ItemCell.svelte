<script lang="ts">
	import type { Item } from '$lib/types';
	import Media from './Media.svelte';

	export let item: Item;
</script>

<div class="overflow-hidden w-44 max-h-1/6 h-full">
	<Media file={item.url} alt={item.filename} class="w-full h-full object-cover" />
</div>
