<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import Masonry from 'svelte-bricks';
  import debounce from 'lodash-es/debounce'

  type T = $$Generic;

	let dispatch = createEventDispatcher();
	let observer: IntersectionObserver;
	let mainContainer: HTMLElement;
	let footerTarget: HTMLElement;

	$: if (hideFooter) {
		observer?.disconnect();
	}

	const observerCallback = (entries: any[]) => {
		const footerTarget = entries[0];

    console.log(footerTarget)

		if (footerTarget.isIntersecting && !disableScrollEvent) {
			onScrollEnd();
		}
	};

  export let data: T[];
	export let itemContainerClass = '';
	export let disableScrollEvent = false;
	export let hideFooter = false;
	export let minColWidth = 150;
	export let maxColWidth = 800;
	export let gap = 20;
  export let debouncedScrollEvent = 0;
  export let thresholdFooter = 0.5

  const onScrollEnd = debounce(() => {
    dispatch('scrollEnd');
  }, debouncedScrollEvent)

	onMount(() => {
		if (mainContainer && footerTarget) {
			observer = new IntersectionObserver(observerCallback, {
				threshold: thresholdFooter
			});

			observer.observe(footerTarget);
		}

		return () => {
			observer?.disconnect();
		};
	});
</script>

<div
	bind:this={mainContainer}
	class="
    tw-w-full
  "
>
	{#if data?.length}
		<div class={$$restProps.class} style:padding={`${gap}px`}>
			<Masonry items={data} {minColWidth} {maxColWidth} {gap} idKey="id" let:item>
				<div class={itemContainerClass}>
					<slot {item} />
				</div>
			</Masonry>
		</div>

		<footer bind:this={footerTarget} class="tw-grid tw-place-items-center tw-p-4">
			<BarLoader size="110" />
		</footer>
	{/if}
</div>
