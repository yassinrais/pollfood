<script lang="ts">
	import type { Level } from '$lib/types';
	import { onMount } from 'svelte';

	export let level: Level;

	let id = Math.random().toString();

	let target: HTMLElement;
	let touchpad: HTMLElement;

	onMount(() => {
		let startX: number, touchpadWidth: number, startScrollLeft: number, targetWidth: number;
		let isMouseDown = false;

		touchpad.addEventListener('mousedown', (e) => {
			isMouseDown = true;
			startX = e.clientX;
			startScrollLeft = target.scrollLeft;
			touchpadWidth = touchpad.offsetWidth;
			targetWidth = target.offsetWidth;
		});

		const onMouseMove = (e: MouseEvent) => {
			if (!isMouseDown) return;

			const x = e.clientX;
			const scrollRatio = touchpadWidth / targetWidth;
			const scrollAmount = (x - startX) * scrollRatio;

			// requestAnimationFrame(() => {
			target.scrollLeft = startScrollLeft - scrollAmount;
			// });
		};

		touchpad.addEventListener('mousemove', onMouseMove);

		touchpad.addEventListener('mouseup', () => {
			isMouseDown = false;
		});

		touchpad.addEventListener('mouseleave', () => {
			isMouseDown = false;
		});
	});
</script>

<div class="flex flex-row border-b border-l border-black flex-grow h-1/6 relative">
	<div class="flex w-40 text-3xl font-thin items-center justify-center {level.style}">
		<span>{level.name}</span>
	</div>
	<div
		bind:this={target}
		class="scroll-smooth snap-x flex flex-row items-center select-none bg-black/20 w-full h-full overflow-y-hidden overflow-x-auto"
	>
		<div class="absolute w-full h-full bg-black/50 opacity-40" bind:this={touchpad}></div>
		<slot />
	</div>
</div>
