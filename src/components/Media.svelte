<script lang="ts">
	let { alt, file, ...restProps } = $props<{ alt: string; file: string }>(); // instead of `export let`

	let extension = $derived(file.split('?')[0].split('/').pop()?.split('.').pop());
	let fileType = $derived(
		['png', 'jpeg', 'jpg', 'webp', 'png', 'gif'].includes(extension!) ? 'image' : 'video'
	);
</script>

{#if fileType === 'image'}
	<img {...restProps} src={file} {alt} />
{:else if fileType === 'video'}
	<video {...restProps} controls>
		<source src={file} type="video/mp4" />
	</video>
{/if}
