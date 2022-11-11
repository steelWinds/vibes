<script lang="ts">
	import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData';

	import { onMount, tick, afterUpdate } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import useGetCollectionsImages from '@/api/unsplash/use-get-collections-images';
	import sourceTypeStore from '@/stores/settings/source-type';
	import selectedCollectionsStore from '@/stores/settings/selected-collections';
	import setPrevSelectedImagesStore from '@/stores/settings/set-prev-selected-images';
	import sourceImagesURI from '@/stores/deriveds/source-images-uri';
	import Preloader from '@/lib/UI/Preloader.svelte';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import LazyList from '@/lib/modules/LazyList.svelte';
	import BaseTablet from '@/lib/UI/BaseTablet.svelte';
	import Link from '@/lib/UI/Link.svelte';
	import LazyImage from '@/lib/Partials/getting-image-page/LazyImage.svelte';

	let blockedLoading = false;
	let uniqueImages: Map<IImageData['id'], IImageData> = new Map();
	let windowInnerBlockSize = 0;
	let windowInnerInlineSize = 0;
	let pendingPreviousLoadingImages = true;
  let previousImagesIsSet = false;

	$: selectedImagesCount =
		$sourceTypeStore.type === 'internet'
			? $sourceTypeStore.sourcesStack.size
			: 0;
	$: postChangeOrientScroll = -(windowInnerBlockSize / 2);
	$: isLaptop = windowInnerInlineSize > 1280;
	$: imagesPerPageFactor = isLaptop ? 3 : 2;
	$: minColWidth = isLaptop ? 400 : 130;
	$: gap = isLaptop ? 20 : 10;

	const getCollectionsImages = useGetCollectionsImages(
		$selectedCollectionsStore,
		{
			page: 1,
			per_page: 10
		}
	);

	const getImages = async () => {
		let fetchImages = await getCollectionsImages(imagesPerPageFactor * 10);

		if (!fetchImages.length) {
			blockedLoading = true;
		}

		fetchImages.forEach((image) => {
			if (
				uniqueImages.has(image.id) ||
				$sourceTypeStore.sourcesStack.has(image.id)
			)
				return;

			uniqueImages.set(image.id, image);
		});

		uniqueImages = uniqueImages;
	};

	const onMountLoading = async () => {
		pendingPreviousLoadingImages = true;

		await getImages();

		pendingPreviousLoadingImages = false;
	};

	let addImage = (image: any) => {
		if ($sourceTypeStore.type !== 'internet') {
			$sourceTypeStore.type = 'internet';
			$sourceTypeStore.sourcesStack = new Map();
		}

		const imageData = image as IImageData;

		sourceTypeStore.addURI(imageData);
	};

	onMount(async () => {
		onMountLoading();

		window.screen.orientation.addEventListener('change', async () => {
			await tick();

			document.documentElement.scrollBy({
				top: postChangeOrientScroll,
				behavior: 'smooth'
			});
		});
	});

  afterUpdate(() => {
    if ($setPrevSelectedImagesStore && selectedImagesCount && !previousImagesIsSet) {
			const previousImages = Array.from(
				$sourceTypeStore.sourcesStack.values()
			).filter((image) => typeof image === 'object');

			previousImages.forEach((image) => {
				const imageData = image as IImageData;

				if (uniqueImages.has(imageData.id)) return;

				uniqueImages.set(imageData.id, imageData);
			});

      previousImagesIsSet = true;
		}
  })
</script>

<svelte:window
	bind:innerHeight={windowInnerBlockSize}
	bind:innerWidth={windowInnerInlineSize}
/>

<div>
	<Preloader
		state={pendingPreviousLoadingImages}
		zIndex="10000"
		position="fixed"
	>
		<BarLoader size="110" />
	</Preloader>

	{#if !pendingPreviousLoadingImages}
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

		<div
			class="
        tw-fixed
        tw-bottom-12
        tw-left-1/2
        tw--translate-x-1/2
        tablet:tw-left-auto
        tablet:tw-right-12
        tablet:tw-translate-x-0
        tw-flex
        tw-flex-col
        tw-items-center
        tablet:tw-items-end
        tw-justify-center
        tw-z-50
      "
		>
			{#if selectedImagesCount > 0}
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
							on:click={sourceTypeStore.clear}
						>
							Unselected all
						</button>
					</BaseTablet>
				</div>
			{/if}

			<BaseTablet class="tw-mt-3 tw-inline-flex">
				<Link
					link="/"
					target="_self"
					class="
            tw-text-xs
            mobile:tw-text-sm
            tablet:tw-text-lg
            tw-px-4
            tw-py-2
          "
				>
					{selectedImagesCount ? 'Set this image(s)' : 'Return home'}
				</Link>
			</BaseTablet>
		</div>

		<LazyList
			data={Array.from(uniqueImages.values())}
			itemContainerClass="
        tw-relative
        tw-rounded-xl
        tw-overflow-hidden
        image-lazy-load-container
      "
			blockedScrollEvent={blockedLoading}
			{minColWidth}
			{gap}
			maxColWidth={99999}
			debouncedScrollEvent={300}
			let:item
			on:scrollEnd={getImages}
		>
			<LazyImage
				selected={$sourceImagesURI}
				image={item}
				on:click={() => addImage(item)}
			/>
		</LazyList>
	{/if}
</div>
