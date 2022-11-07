<script lang="ts">
	import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

	import { onMount, tick } from 'svelte';
	import lazyLoad from '@/actions/lazy-load';
	import getRandomImages from '@/api/unsplash/get-random-images';
	import sourceTypeStore from '@/stores/settings/source-type';
	import selectedCollectionsStore from '@/stores/settings/selected-collections';
	import unsplashImageQualityStore from '@/stores/settings/unsplash-image-quality';
	import uniq from 'lodash-es/uniq';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import LazyList from '@/lib/modules/LazyList.svelte';
	import BaseTablet from '@/lib/UI/BaseTablet.svelte';

	let blockedLoading = false;
	let uniqueImages: IImageData[] = [];
	let imagesIdxes: string[] = [];
	let windowInnerBlockSize = 0;
	let windowInnerInlineSize = 0;

	$: selectedImagesCount =
		$sourceTypeStore.type === 'internet'
			? $sourceTypeStore.sourcesStack.size
			: 0;
	$: postChangeOrientScroll = -(windowInnerBlockSize / 2);
	$: isTablet = windowInnerInlineSize > 1280;
	$: minColWidth = isTablet ? 400 : 130;
	$: gap = isTablet ? 20 : 10;

	const getImages = async () => {
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
	};

	let promiseGetRandomImages: ReturnType<typeof getImages>;

	let addImage = (image: any) => {
		if ($sourceTypeStore.type !== 'internet') {
			$sourceTypeStore.type = 'internet';
			$sourceTypeStore.sourcesStack = new Set();
		}

		const imageData = image as IImageData;
		const imageURI = imageData.urls[$unsplashImageQualityStore];

		if ($sourceTypeStore.sourcesStack.has(imageURI)) {
			sourceTypeStore.deleteURI(imageURI);

			return;
		}

		sourceTypeStore.addURI(imageURI);
	};

	onMount(() => {
		promiseGetRandomImages = getImages();

		window.screen.orientation.addEventListener('change', async () => {
			await tick();

			document.documentElement.scrollBy({
				top: postChangeOrientScroll,
				behavior: 'smooth'
			});
		});
	});
</script>

<svelte:window
	bind:innerHeight={windowInnerBlockSize}
	bind:innerWidth={windowInnerInlineSize}
/>

<div>
	<div
		class="
      tw-sticky
      tw-top-0
      tw-flex
      tw-flex-col
      tw-space-y-3
      tw-items-stretch
      tw-text-center
      tablet:tw-flex-row
      tablet:tw-space-y-0
      tablet:tw-space-x-3
      tablet:tw-items-center
      tw-justify-between
      tw-z-50
    "
		style:padding-inline={`${gap * 2}px`}
		style:padding-block-start={`${gap}px`}
	>
		<BaseTablet>
			<h3
				class="
          tw-text-xs
          mobile:tw-text-sm
          tablet:tw-text-lg
          tw-px-4
          tw-py-2
        "
			>
				Selected images: {selectedImagesCount}
			</h3>
		</BaseTablet>

		<BaseTablet>
			<button
				class="
          tw-block
          tw-h-full
          tw-w-full
          tw-text-xs
          mobile:tw-text-sm
          tablet:tw-text-lg
          tw-px-4
          tw-py-2
          disabled:tw-opacity-[0.75]
        "
				disabled={!$sourceTypeStore.sourcesStack.size}
				on:click={sourceTypeStore.clear}
			>
				Unselected all
			</button>
		</BaseTablet>
	</div>

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
			disableScrollEvent={blockedLoading}
			hideFooter={blockedLoading}
			{minColWidth}
			{gap}
			maxColWidth={99999}
			debouncedScrollEvent={300}
			let:item
			on:scrollEnd={getImages}
		>
			<button
				class={`
          tw-block
          tw-w-full
          tw-h-full
          tw-rounded-xl
          tw-overflow-hidden
          ${
						$sourceTypeStore.sourcesStack.has(
							item?.urls?.[$unsplashImageQualityStore]
						)
							? 'tw-border-4 tw-border-electric-blue'
							: ''
					}  
        `}
				on:click={() => addImage(item)}
			>
				<img
					class="
              img-hide-alt
              tw-w-full
              tw-h-full
              tw-block
              tw-object-fit
            "
					use:lazyLoad={{
						...item,
						src: item?.urls?.[$unsplashImageQualityStore],
						parentPreloaderClass: ['tw-animate-pulse'],
						imagePreloaderClass: ['tw-opacity-0'],
						defaultAlt: 'Colored image',
						defaultColorPlug: 'rgb(146 144 146)'
					}}
				/>
			</button>
		</LazyList>
	{/await}
</div>
