<script lang="ts">
	import type { Item } from '$lib/types';
	import Media from './Media.svelte';

	export let item: Item;
</script>

<div class="overflow-hidden snap-start w-44 max-h-1/6 h-full flex-shrink-0">
	<Media file={item.url} alt={item.filename} class="w-full h-full object-cover" />
</div>
