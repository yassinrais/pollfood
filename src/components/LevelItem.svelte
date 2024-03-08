<script lang="ts">
	import type { Level } from '$lib/types';

	export let level: Level;
</script>

<div class="flex flex-row flex-grow border-b border-l border-black h-44">
	<div class="flex w-40 text-3xl font-thin items-center justify-center {level.style}">
		<span>{level.name}</span>
	</div>
	<div class="flex flex-row items-center bg-black/20 w-full h-full">
		<slot />
	</div>
</div>
