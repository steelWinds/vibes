<script lang="ts">
	import type { ImageData } from '@/types/API/DataTypes/ImageData';

	import { onMount } from 'svelte';
	import lazyLoad from '@/actions/lazy-load';
	import getRandomImages from '@/api/unsplash/get-random-images';
	import selectedCollectionsStore from '@/stores/settings/selected-collections';
	import uniq from 'lodash-es/uniq';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import LazyList from '@/lib/modules/LazyList.svelte';

	let blockedLoading = false;
	let uniqueImages: ImageData[] = [];
	let imagesIdxes: string[] = [];
	let windowInnerInlineSize = 0;

	$: verticalScrollSize = windowInnerInlineSize > 764 ? 4 : 3;

	const getImages = async (scroll?: boolean) => {
		let images = await getRandomImages({
			count: 30,
			collections: selectedCollectionsStore.getIdx().join(',')
		});

		const newImages = images.filter((image) => {
			return !imagesIdxes.includes(image.id);
		});

		const newIdxes = uniq(images.map((image) => image.id));
		imagesIdxes = [...imagesIdxes, ...newIdxes];

		uniqueImages = [...uniqueImages, ...newImages];

		if (scroll) {
			window.scrollBy({
				top: verticalScrollSize,
				behavior: 'smooth'
			});
		}
	};

	let promiseGetRandomImages: ReturnType<typeof getImages>;

	onMount(() => {
		promiseGetRandomImages = getImages();
	});
</script>

<svelte:window bind:innerWidth={windowInnerInlineSize} />

<div>
	{#await promiseGetRandomImages}
		<div
			class="
          tw-grid
          tw-place-items-center
          tw-w-full
          tw-h-screen
        "
		>
			<BarLoader size="110" />
		</div>
	{:then}
		<!-- svelte-ignore a11y-missing-attribute -->
		<LazyList
			data={uniqueImages}
			class="
          tw-min-h-screen
          tw-h-full
        "
			itemContainerClass="
          tw-rounded-xl
          tw-overflow-hidden
          image-lazy-load-container
        "
			let:item
			disableScrollEvent={blockedLoading}
			hideFooter={blockedLoading}
			minColWidth={300}
			maxColWidth={99999}
			gap={20}
			on:scrollEnd={() => getImages(true)}
		>
			<button class="tw-block">
				<img
					class="
              tw-w-full
              tw-h-full
              tw-block
            "
					use:lazyLoad={{
						...item,
						preloaderClass: 'tw-animate-pulse',
						defaultAlt: 'Colored image',
						defaultColorPlug: 'rgb(146 144 146)'
					}}
				/>
			</button>
		</LazyList>
	{/await}
</div>
