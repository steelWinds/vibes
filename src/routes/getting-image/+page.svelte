<script lang="ts">
	import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

	import { onMount, tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import lazyLoad from '@/actions/lazy-load';
	import getRandomImages from '@/api/unsplash/get-random-images';
	import sourceTypeStore from '@/stores/settings/source-type';
	import selectedCollectionsStore from '@/stores/settings/selected-collections';
	import unsplashImageQualityStore from '@/stores/settings/unsplash-image-quality';
	import uniq from 'lodash-es/uniq';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import LazyList from '@/lib/modules/LazyList.svelte';
	import BaseTablet from '@/lib/UI/BaseTablet.svelte';
	import data from './data.json';

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
	{#await promiseGetRandomImages}
		<div
			class="
          tw-fixed
          tw-w-full
          tw-top-0
          tw-left-0
          tw-grid
          tw-place-items-center
          tw-w-full
          tw-min-h-screen
          tw-h-full
          tw-bg-white
          dark:tw-bg-raisin-black
          tw-z-[9999]
        "
		>
			<BarLoader size="110" />
		</div>
	{:then}
		<BaseTablet
			class="
        tw-fixed
        tw-top-6
        tw-left-1/2
        tw--translate-x-1/2
        tw-z-50
      "
		>
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

		{#if $sourceTypeStore.sourcesStack.size > 0}
			<div
				class="
          tw-fixed
          tw-bottom-12
          tw-left-1/2
          tw--translate-x-1/2
          tablet:tw-left-auto
          tablet:tw-right-12
          tablet:tw-translate-x-0
          tw-z-50
        "
			>
				<div
					transition:scale={{
						duration: 250,
						easing: cubicInOut
					}}
				>
					<BaseTablet>
						<button
							class="
                tw-text-xs
                mobile:tw-text-sm
                tablet:tw-text-lg
                tw-px-4
                tw-py-2
              "
							on:click={() => sourceTypeStore.clear()}
						>
							Unselected all
						</button>
					</BaseTablet>
				</div>
			</div>
		{/if}

		<!-- svelte-ignore a11y-missing-attribute -->
		<LazyList
			{data}
			class="
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
          tw-transition-all
          tw-duration-50
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
