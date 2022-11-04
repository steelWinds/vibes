<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import Masonry from 'svelte-bricks';

	let dispatch = createEventDispatcher();
	let observer: IntersectionObserver;
	let mainContainer: HTMLElement;
	let footerTarget: HTMLElement;

	$: if (hideFooter) {
		observer?.disconnect();
	}

	const observerCallback = (entries: any[]) => {
		const footerTarget = entries[0];

		if (footerTarget.isIntersecting && !disableScrollEvent) {
			dispatch('scrollEnd');
		}
	};

	export let data: Array<{ [key: string]: any }>;
	export let itemContainerClass = '';
	export let disableScrollEvent = false;
	export let hideFooter = false;
	export let minColWidth = 150;
	export let maxColWidth = 800;
	export let gap = 20;

	onMount(() => {
		if (mainContainer && footerTarget) {
			observer = new IntersectionObserver(observerCallback, {
				threshold: 0.5
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
	style:padding={`${gap}px`}
>
	{#if data?.length}
		<div class={$$restProps.class}>
			<Masonry items={data} {minColWidth} {maxColWidth} {gap} idKey="id" let:item>
				<div data-aos="fade-up" class={itemContainerClass}>
					<slot {item} />
				</div>
			</Masonry>
		</div>

		<footer bind:this={footerTarget} class="tw-grid tw-place-items-center tw-p-4">
			<BarLoader size="110" />
		</footer>
	{/if}
</div>
