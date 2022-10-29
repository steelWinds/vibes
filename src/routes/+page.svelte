<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { URLData } from '@/modules/get-img-url/types/URLData.type';

	import { onMount } from 'svelte';
	import { scale, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { getColorWithType } from '@/modules/median-cut';
	import getImgURL from '@/modules/get-img-url';
	import addKeyListener from '@/modules/add-key-listener';
	import copyToast from '@/configs/svelte-toast/events/copy-toast';
	import { SwiperSlide } from 'swiper/svelte';
	import { Navigation } from 'swiper';
	import { Modal } from 'carbon-components-svelte';
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';
	import { FileUploaderDropContainer } from 'carbon-components-svelte';
	import DrawerMenu from '@/lib/UI/DrawerMenu.svelte';
	import Link from '@/lib/UI/Link.svelte';
	import SwitchBtn from '@/lib/UI/SwitchBtn.svelte';
	import Slider from '@/lib/modules/Slider.svelte';

	type SourceType = 'uploading' | 'started' | 'internet';

	const setUploadingImages = async (event: CustomEvent) => {
		imagesFiles = [];

		imagesFiles = await getImgURL(...event.detail);

		if (!imagesFiles.length) return;

		changeSourceType('uploading');

		uploadingModalState = false;
	};

	let promiseSetUploadingImages: Promise<any>;

	let currentImageRef: HTMLImageElement;
	let currentImagesStack: HTMLImageElement[] = [];
	let currentSourceType: SourceType = 'started';
	let canvasRef: HTMLCanvasElement;
	let drawerMenuRef: SvelteComponent;
	let drawerMenuVisible = false;
	let uploadingModalState = false;
	let imagesFiles: URLData[] = [];
	let showOptions = true;
	let currentColor = '#ffff';

	const changeColor = () => {
		currentColor = getColorWithType({
			image: currentImageRef,
			canvas: canvasRef,
			type: 'hex'
		});

		copyToast(currentColor, 3000, true);
	};

	const changeImage = (event: CustomEvent) => {
		const { activeIndex } = event.detail;
		const image = currentImagesStack[activeIndex];

		if (!image) return;

		currentImageRef = image;

		if (image.complete) {
			changeColor();
		}

		image.onload = () => {
			changeColor();
		};
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
        tw-absolute
        tw-right-10
        tw-top-10
      "
			data-ignore-outside="true"
		>
			<SwitchBtn
				on:click={() => drawerMenuRef.toggleVisible()}
				transitionType={scale}
				transitionProps={{
					duration: 250
				}}
				switchValue={drawerMenuVisible}
				class="
          tw-transition-all
          tw-duration-250
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
		</div>
	{/if}

	<canvas
		bind:this={canvasRef}
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
			<div
				transition:scale={{
					duration: 250
				}}
				class="
          tw-flex
          tw-justify-center
          tw-w-full
          tw-space-x-4
          tw-absolute
          tw--bottom-20
          tw-z-10
        "
			>
				<button
					class="
            tw-hidden
            tablet:tw-block
            prev-arr
            tw-bg-white
            tw-p-3
            tw-rounded-full
            tw-aspect-square
            tw--rotate-90
            active:tw-translate-x-2
            tw-duration-250
          "
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 47.255 47.255"
						class="
              tw-transition-all
              tw-duration-500
              tw-w-[24px]
              tw-fill-raisin-black
            "
						><path
							d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
						/></svg
					>
				</button>

				<button
					class="
            tw-hidden
            tablet:tw-block
            next-arr
            tw-bg-white
            tw-p-3
            tw-rounded-full
            tw-aspect-square
            tw-rotate-90
            active:tw--translate-x-2
            tw-duration-250
          "
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 47.255 47.255"
						class="
              tw-transition-all
              tw-duration-500
              tw-w-[24px]
              tw-fill-raisin-black
            "
						><path
							d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
						/></svg
					>
				</button>
			</div>
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
	bind:this={drawerMenuRef}
	bind:open={drawerMenuVisible}
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
>
	<button
		class="tw-text-xl tw-w-full tw-h-full tw-rounded-xl scaleable-shadow"
		on:click={() => changeSourceType('started')}
	>
		<span class="tw-grid tw-place-items-center tw-w-full tw-h-full"> STARTED </span>
	</button>

	<Link link="jopa" class="tw-text-xl tw-w-full tw-h-full tw-rounded-xl scaleable-shadow">
		<span class="tw-grid tw-place-items-center tw-w-full tw-h-full"> INTERNET </span>
	</Link>

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
	<div class="out-in-transition tw-h-full">
		{#await promiseSetUploadingImages}
			<div
				class="tw-grid tw-place-items-center"
				transition:fly={{
					duration: 250,
					x: -300,
					easing: cubicInOut
				}}
			>
				<span
					class="
            tw-inline-block
            tw-w-fit
            tw-overflow-hidden
            tw-rounded-xl
          "
				>
					<BarLoader size="110" color="#2C75FF" unit="px" duration="1.3s" />
				</span>
			</div>
		{:then}
			<div
				transition:fly={{
					duration: 250,
					x: -300,
					easing: cubicInOut
				}}
			>
				<FileUploaderDropContainer
					multiple
					class="custom-uploader"
					labelText="Drag and drop files here or click to upload"
					on:change={(event) => {
						promiseSetUploadingImages = setUploadingImages(event);
					}}
				/>
			</div>
		{/await}
	</div>
</Modal>
