<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { URLData } from '@/modules/get-img-url/types/URLData.type';

	import { getColorWithType } from '@/modules/median-cut';
	import getImgURL from '@/modules/get-img-url';
	import addKeyListener from '@/modules/add-key-listener';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import DrawerMenu from '@/lib/UI/DrawerMenu.svelte';
	import Link from '@/lib/UI/Link.svelte';
	import SwitchBtn from '@/lib/UI/SwitchBtn.svelte';
	import Color from 'color';
	import Slider from '@/lib/modules/Slider.svelte';
	import { SwiperSlide } from 'swiper/svelte';
	import { FileUploaderDropContainer } from 'carbon-components-svelte';
	import { Navigation } from 'swiper';
	import { Modal } from 'carbon-components-svelte';

	type SourceType = 'uploading' | 'started' | 'internet';

	let currentImage: HTMLImageElement;
	let currentImagesStack: HTMLImageElement[] = [];
	let currentSourceType: SourceType = 'started';
	let canvas: HTMLCanvasElement;
	let imageTypeMenu: SvelteComponent;
	let sourceModeMenu: SvelteComponent;
	let uploadingModalState = false;
	let imagesFiles: URLData[] = [];
	let imageTypeMenuVisible = false;
	let sourceModeMenuVisible = false;
	let showOptions = true;
	let currentColor = '#ffff';

	$: alternateColor = Color(currentColor).negate().rotate(10).saturate(0.5).hex();

	const changeColor = () => {
		currentColor = getColorWithType({
			image: currentImage,
			canvas,
			type: 'hex'
		});
	};

	const changeImage = (event: CustomEvent) => {
		const { activeIndex } = event.detail;
		const image = currentImagesStack[activeIndex];

		if (!image) return;

		currentImage = image;

		if (image.complete) {
			changeColor();
		}

		image.onload = () => {
			changeColor();
		};
	};

	const setUploadingImages = async (event: CustomEvent) => {
		imagesFiles = [];

		imagesFiles = await getImgURL(...event.detail);

		if (!imagesFiles.length) return;

		changeSourceType('uploading');
	};

	const clearImagesStack = () => {
		currentImagesStack = [];
	};

	const changeSourceType = (type: SourceType) => {
		currentSourceType = type;
	};

	onMount(() => {
		addKeyListener({
			callback: () => (showOptions = !showOptions),
			target: window,
			keyCode: 'Space'
		});
	});
</script>

<div
	class="
    tw-h-full
    tw-w-full
    tw-grid
    tw-place-items-center
    tw-p-3
    tw-transition-all
    tw-duration-500
    tw-relative
  "
	style:background={currentColor}
>
	{#if showOptions}
		<div
			transition:scale={{
				duration: 250
			}}
			class="
        tw-grid
        tw-grid-cols-2
        tw-gap-3
        tw-absolute
        tw-right-10
        tw-top-10
      "
		>
			<SwitchBtn
				on:click={() => {
					imageTypeMenuVisible = imageTypeMenu.toggleVisible();
				}}
				transitionType={scale}
				transitionProps={{
					duration: 250
				}}
				switchValue={imageTypeMenuVisible}
				class="
          tw-transition-all
          tw-duration-300
          custom
          tw-p-3
          tw-rounded-full
          tw-aspect-square
          tw-bg-white
          tw-relative
        "
				switchedClass="
          tw-shadow-xl
          tablet:tw-shadow-none
          tw-z-50
        "
			>
				<svelte:fragment slot="switch-true">
					<img src="/assets/ui-icons/cross.svg" class="tw-w-[18px]" alt="Cross icon" />
				</svelte:fragment>

				<svelte:fragment slot="switch-false">
					<img src="/assets/ui-icons/menu.svg" class="tw-w-[18px]" alt="Cross icon" />
				</svelte:fragment>
			</SwitchBtn>

			<SwitchBtn
				on:click={() => {
					sourceModeMenuVisible = sourceModeMenu.toggleVisible();
				}}
				transitionType={scale}
				transitionProps={{
					duration: 250
				}}
				switchValue={sourceModeMenuVisible}
				class="
          tw-transition-all
          tw-duration-300
          custom
          tw-p-3
          tw-rounded-full
          tw-aspect-square
          tw-bg-white
          tw-relative
        "
				switchedClass="
          tw-shadow-xl
          tw-z-50
        "
			>
				<svelte:fragment slot="switch-true">
					<img src="/assets/ui-icons/cross.svg" class="tw-w-[18px]" alt="Cross icon" />
				</svelte:fragment>

				<svelte:fragment slot="switch-false">
					<img src="/assets/ui-icons/switch-mode.svg" class="tw-w-[18px]" alt="Cross icon" />
				</svelte:fragment>
			</SwitchBtn>
		</div>
	{/if}

	<canvas
		bind:this={canvas}
		class="
      tw-absolute
      tw-left-0
      tw-right-0
      tw-invisible
      tw-opacity-0
    "
	/>

	<div
		class="
      tw-relative
      tw-w-full
      tw-max-w-lg
      tw-min-w-0
    "
	>
		{#if showOptions}
			<button
				transition:scale={{
					duration: 250
				}}
				class="
          tw-hidden
          tablet:tw-block
          tw-z-10
          tw-absolute
          tw-top-1/2
          tw--left-[36px]
          tw--translate-y-1/2
          prev-arr
          tw-w-[32px]
          tw-aspect-square
          tw--rotate-90
        "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 47.255 47.255"
					style:fill={alternateColor}
					class="tw-transition-all tw-duration-500"
					><path
						d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
					/></svg
				>
			</button>

			<button
				transition:scale={{
					duration: 250
				}}
				class="
          tw-hidden
          tablet:tw-block
          tw-z-10
          tw-absolute
          tw-top-1/2
          tw--right-[36px]
          tw--translate-y-1/2
          next-arr
          tw-w-[32px]
          tw-aspect-square
          tw-rotate-90
        "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 47.255 47.255"
					style:fill={alternateColor}
					class="tw-transition-all tw-duration-500"
					><path
						d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
					/></svg
				>
			</button>
		{/if}

		{#if currentSourceType === 'started'}
			<Slider
				modules={[Navigation]}
				navigation={showOptions
					? {
							enabled: showOptions,
							nextEl: '.next-arr',
							prevEl: '.prev-arr'
					  }
					: false}
				class="
          tw-w-full
          tw-rounded-2xl
          tw-drop-shadow-2xl
          tw-aspect-square
          tw-select-none
          ultra-mobile:tw-aspect-auto
        "
				loop
				slidesPerView={1}
				on:beforeInit={clearImagesStack}
				on:afterInit={changeImage}
				on:indexChanged={changeImage}
			>
				{#each [...Array(3).keys()] as n, i (`image-${i}`)}
					<SwiperSlide>
						<img
							bind:this={currentImagesStack[i]}
							src={`/assets/started-gifs/image-${i + 1}.jpg`}
							class="tw-h-[300px] tw-w-full tw-object-cover"
							alt={`Image of ${i}`}
						/>
					</SwiperSlide>
				{/each}
			</Slider>
		{:else if currentSourceType === 'uploading' && imagesFiles.length}
			<Slider
				modules={[Navigation]}
				navigation={showOptions
					? {
							enabled: showOptions,
							nextEl: '.next-arr',
							prevEl: '.prev-arr'
					  }
					: false}
				class="
          tw-w-full
          tw-rounded-2xl
          tw-drop-shadow-2xl
          tw-aspect-square
          tw-select-none
          ultra-mobile:tw-aspect-auto
        "
				slidesPerView={1}
				loop
				on:beforeInit={clearImagesStack}
				on:afterInit={changeImage}
				on:indexChanged={changeImage}
			>
				{#each imagesFiles as image, i (`uploading-${i}`)}
					<SwiperSlide>
						<img
							bind:this={currentImagesStack[i]}
							src={image.url}
							class="tw-h-[300px] tw-w-full tw-object-cover"
							alt={`Image of ${i}`}
						/>
					</SwiperSlide>
				{/each}
			</Slider>
		{/if}
	</div>
</div>

<DrawerMenu
	class="
    tw-w-full
    tablet:tw-w-[300px]
    tw-p-0
    tablet:tw-p-3
  "
	containerClass="
    tw-rounded-none
    tablet:tw-rounded-xl
    tw-grid
    tw-grid-rows-2
    tw-bg-white
  "
	positionSide="left"
	bind:this={imageTypeMenu}
>
	<Link link="jopa" class="scaleable-shadow">
		<div
			class="
        tw-rounded-xl
        tw-w-full
        tw-h-full
        tw-grid
        tw-place-items-center
    "
		>
			<img
				class="tw-w-full tw-max-w-[10rem]"
				src="/assets/ui-icons/img-search.svg"
				alt="Icon of img-search"
			/>
		</div>
	</Link>

	<Link link="jopa" class="scaleable-shadow">
		<div
			class="
        tw-rounded-xl
        tw-w-full
        tw-h-full
        tw-grid
        tw-place-items-center
      "
		>
			<img
				class="tw-w-full tw-max-w-[10rem]"
				src="/assets/ui-icons/img-download.svg"
				alt="Icon of img-download"
			/>
		</div>
	</Link>
</DrawerMenu>

<DrawerMenu
	class="
    tw-w-full
    tablet:tw-w-[300px]
    tw-p-0
    tablet:tw-p-3
  "
	containerClass="
    tw-rounded-none
    tablet:tw-rounded-xl
    tw-grid
    tw-grid-rows-3
    tw-bg-white
    tw-text-raisin-black
  "
	positionSide="left"
	bind:this={sourceModeMenu}
>
	<button
		class="tw-text-xl tw-w-full tw-h-full tw-rounded-xl scaleable-shadow"
		on:click={() => changeSourceType('started')}
	>
		<span class="tw-grid tw-place-items-center tw-w-full tw-h-full"> STARTED </span>
	</button>

	<button class="tw-text-xl tw-w-full tw-h-full tw-rounded-xl scaleable-shadow">
		<span class="tw-grid tw-place-items-center tw-w-full tw-h-full"> INTERNET </span>
	</button>

	<button
		class="tw-text-xl tw-w-full tw-h-full tw-rounded-xl scaleable-shadow"
		on:click={() => {
			uploadingModalState = true;
		}}
	>
		<span class="tw-grid tw-place-items-center tw-w-full tw-h-full"> UPLOAD </span>
	</button>
</DrawerMenu>

<Modal
	class="custom-modal no-footer"
	bind:open={uploadingModalState}
	modalHeading="Upload file(s)"
	on:open
	on:close
	on:submit
	passiveModal
>
	<FileUploaderDropContainer
		multiple
		class="custom-uploader"
		labelText="Drag and drop files here or click to upload"
		on:change={setUploadingImages}
	/>
</Modal>
