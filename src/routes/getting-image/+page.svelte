<script lang="ts">
	import type { ImageData } from '@/types/API/DataTypes/ImageData';

	import { onMount, tick } from 'svelte';
	import lazyLoad from '@/actions/lazy-load';
	import getRandomImages from '@/api/unsplash/get-random-images';
  import sourceTypeStore from '@/stores/settings/source-type';
	import selectedCollectionsStore from '@/stores/settings/selected-collections';
  import unsplashImageQualityStore from '@/stores/settings/unsplash-image-quality';
	import uniq from 'lodash-es/uniq';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import LazyList from '@/lib/modules/LazyList.svelte';

	let blockedLoading = false;
	let uniqueImages: ImageData[] = [];
	let imagesIdxes: string[] = [];
	let windowInnerBlockSize = 0;
	let windowInnerInlineSize = 0;

  $: selectedImagesCount = $sourceTypeStore.sourcesStack.size
	$: postLoadedScroll = windowInnerBlockSize / 4;
  $: postChangeOrientScroll = -(windowInnerBlockSize / 2)
  $: isTablet = windowInnerInlineSize > 1280
  $: minColWidth = isTablet ? 400 : 130;
  $: gap = isTablet ? 20 : 10;

  $: {
    console.log($sourceTypeStore.sourcesStack)
  }

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
    if ($sourceTypeStore.type !== 'uploading') {
      $sourceTypeStore.type = 'uploading';
      $sourceTypeStore.sourcesStack = new Set();
    }

    const imageData = image as ImageData;
    const imageURI = imageData.urls[$unsplashImageQualityStore]

    if ($sourceTypeStore.sourcesStack.has(imageURI)) {
      sourceTypeStore.deleteURI(imageURI)

      return
    }

    sourceTypeStore.addURI(imageURI)
  }  

	onMount(() => {
		promiseGetRandomImages = getImages();

    window.screen.orientation.addEventListener('change', async () => {
      await tick();

      document.documentElement.scrollBy({
          top: postChangeOrientScroll,
          behavior: 'smooth'
      });
    })
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
      tw-flex
      tw-row
      tw-items-center
      tw-px-4
      tw-py-2
      tw-bg-white
      dark:tw-bg-raisin-black
      tw-text-raisin-black
      dark:tw-text-white
      tw-shadow-md
      tw-shadow-raisin-black-crystal
      dark:tw-shadow-electric-blue-crystal
      tw-w-fit
      tw-rounded
      tw-z-50
      tw-ml-auto
    "
    style:top={`${gap}px`}
    style:right={`${gap}px`}
    style:margin-bottom={`${gap}px`}
  >
    <h3 class="tw-text-lg">
      Selected images: { selectedImagesCount }
    </h3>
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
        class="tw-block tw-w-full tw-h-full"
        on:click={() => addImage(item)}
      >
				<img
					class="
              tw-w-full
              tw-h-full
              tw-block
              tw-object-fit
            "
					use:lazyLoad={{
						...item,
            src: item?.urls?.[$unsplashImageQualityStore],
						preloaderClass: 'tw-animate-pulse',
						defaultAlt: 'Colored image',
						defaultColorPlug: 'rgb(146 144 146)'
					}}
				/>
			</button>
		</LazyList>
	{/await}
</div>
