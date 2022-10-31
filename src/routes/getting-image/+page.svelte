<script lang="ts">
	import type { ImageData } from '@/types/API/ImageData';

	import { onMount } from 'svelte';
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';
	import lazyLoad from '@/actions/lazy-load';
	import { _fetch } from '@/modules/fetch';

	const getRandomImages = async () => {
		images = await _fetch('/photos/random', {
			query: {
				count: 50,
				collections: [9737757]
			}
		});
	};

	let promiseGetRandomImages: ReturnType<typeof getRandomImages>;

	let images: ImageData[];

	onMount(() => {
		promiseGetRandomImages = getRandomImages();
	});
</script>

{#await promiseGetRandomImages}
	<div
		class="
        tw-grid
        tw-place-items-center
        tw-w-full
        tw-h-screen
      "
	>
		<BarLoader size="110" color="#2C75FF" unit="px" duration="1.3s" />
	</div>
{:then}
	<div
		class="
      tw-columns-2
      mobile:tw-columns-3
      tablet:tw-columns-4
      tw-gap-3
      tw-p-3
    "
	>
		{#if images?.length}
			{#each images as img}
				<div
					class="
                tw-rounded-xl
                tw-overflow-hidden
                tw-mb-3
              "
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					<img
						class="
                  tw-w-full
                  tw-block
                  tw-object-cover
                "
						use:lazyLoad={{
							...img,
							preloaderClass: 'tw-animate-pulse',
							defaultAlt: 'Colored image',
							defaultColorPlug: 'rgb(146 144 146)'
						}}
					/>
				</div>
			{/each}
		{/if}
	</div>
{/await}

<style lang="postcss">
	.style {
		column-width: calc(100% / 6);
	}
</style>
