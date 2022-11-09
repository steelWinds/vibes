<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { inview } from 'svelte-inview';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import Masonry from 'svelte-bricks';
	import debounce from 'lodash-es/debounce';

	type T = $$Generic;

	export let data: T[];
	export let itemContainerClass = '';
	export let minColWidth = 150;
	export let maxColWidth = 800;
	export let gap = 20;
	export let debouncedScrollEvent = 0;
	export let blockedScrollEvent = false;

	let dispatch = createEventDispatcher();
	let mainContainer: HTMLElement;

	$: paddingBottom = blockedScrollEvent ? gap : 0;

	const onScrollEnd = debounce(() => {
		if (blockedScrollEvent) return;

		dispatch('scrollEnd');
	}, debouncedScrollEvent);
</script>

<div
	bind:this={mainContainer}
	class="
    tw-h-full
    tw-w-full
  "
	style:padding={`${gap}px`}
	style:padding-bottom={`${paddingBottom}px`}
>
	{#if data?.length}
		<div class={$$restProps.class}>
			<Masonry
				items={data}
				{minColWidth}
				{maxColWidth}
				{gap}
				idKey="id"
				let:item
			>
				<div class={itemContainerClass}>
					<slot {item} />
				</div>
			</Masonry>
		</div>
	{/if}

	{#if !blockedScrollEvent}
		<footer
			use:inview={{
				threshold: 0.3
			}}
			on:enter={() => onScrollEnd()}
			class="tw-grid tw-place-items-center tw-p-14"
		>
			<BarLoader size="110" />
		</footer>
	{/if}
</div>

<style lang="postcss">
	.lazy-list {
		position: fixed;
		bottom: 0;
		block-size: 100%;
		inline-size: 100%;
		overflow: scroll;
	}
</style>
