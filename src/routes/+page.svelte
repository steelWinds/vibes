<script lang="ts">
	import type { URLData } from '@/modules/get-img-url/types/URLData.type';

	import { onMount } from 'svelte';
	import { scale, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { getColorWithType } from '@/modules/median-cut';
	import getImgURL from '@/modules/get-img-url';
	import addKeyListener from '@/modules/add-key-listener/addKeyListener';
	import copyToast from '@/modules/svelte-toast-types/copy-toast';
	import debounce from 'lodash-es/debounce';
	import themeStore from '@/stores/settings/theme-store';
  import svelteToastStore from '@/stores/settings/svelte-toast-store'
	import { SwiperSlide } from 'swiper/svelte';
	import { Navigation } from 'swiper';
	import { Modal } from 'carbon-components-svelte';
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';
	import { FileUploaderDropContainer } from 'carbon-components-svelte';
	import DrawerMenu from '@/lib/UI/DrawerMenu.svelte';
	import Link from '@/lib/UI/Link.svelte';
	import SwitchBtn from '@/lib/UI/SwitchBtn.svelte';
	import Slider from '@/lib/modules/Slider.svelte';
	import ToggleTitle from '@/lib/UI/ToggleTitle.svelte';

	type SourceType = 'uploading' | 'started' | 'internet';
	type MenuType = 'sources' | 'settings';

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
	let drawerMenuVisible = false;
	let uploadingModalState = false;
	let imagesFiles: URLData[] = [];
	let showOptions = true;
	let currentColor = '#ffff';
	let menuType: MenuType;

	const changeColor = debounce(() => {
		currentColor = getColorWithType({
			image: currentImageRef,
			canvas: canvasRef,
			type: 'hex'
		});

		copyToast(currentColor, 3000, true);
	}, 250);

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

	const toggleMenu = (type: MenuType) => {
		menuType = type;

		drawerMenuVisible = !drawerMenuVisible;
	};

	onMount(() => {
		const removeListener = addKeyListener({
			callback: () => (showOptions = !showOptions),
			target: window,
			keyCode: 'Space'
		});

		return removeListener;
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
        tw-flex
        tw-row
        tw-space-x-3
        tw-absolute
        tw-right-5
        tw-top-5
      "
			data-ignore-outside="true"
		>
			<SwitchBtn
				on:click={() => toggleMenu('sources')}
				transitionType={scale}
				transitionProps={{
					duration: 250
				}}
				switchValue={drawerMenuVisible && menuType === 'sources'}
				class={`
          tw-grid
          tw-place-items-center
          tw-transition-all
          tw-duration-250
          custom
          tw-w-[42px]
          tw-rounded-full
          tw-aspect-square
          tw-bg-white
          dark:tw-bg-raisin-black-pre-crystal
          tw-relative
        `}
				switchedClass="
          tw-shadow-xl
          tablet:tw-shadow-none
          tw-z-50
        "
			>
				<svelte:fragment slot="switch-true">
					<svg
						class="tw-w-[18px] tw-stroke-raisin-black dark:tw-stroke-white"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M20 20L4 4.00003M20 4L4.00002 20" stroke-width="2" stroke-linecap="round" />
					</svg>
				</svelte:fragment>

				<svelte:fragment slot="switch-false">
					<svg
						class="tw-w-[18px] tw-fill-raisin-black dark:tw-fill-white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 458.379 458.379"
					>
						<circle cx="53.792" cy="53.311" r="53.311" />
						<circle cx="404.908" cy="53.311" r="53.311" />
						<circle cx="229.35" cy="53.311" r="53.311" />
						<circle cx="53.472" cy="229.19" r="53.312" />
						<circle cx="404.587" cy="229.19" r="53.312" />
						<circle cx="229.03" cy="229.19" r="53.312" />
						<circle cx="53.472" cy="405.068" r="53.311" />
						<circle cx="404.587" cy="405.068" r="53.311" />
						<circle cx="229.03" cy="405.068" r="53.311" />
					</svg>
				</svelte:fragment>
			</SwitchBtn>

			<SwitchBtn
				on:click={() => toggleMenu('settings')}
				transitionType={scale}
				transitionProps={{
					duration: 250
				}}
				switchValue={drawerMenuVisible && menuType === 'settings'}
				class="
          tw-grid
          tw-place-items-center
          tw-transition-all
          tw-duration-250
          custom
          tw-w-[42px]
          tw-rounded-full
          tw-aspect-square
          tw-bg-white
          dark:tw-bg-raisin-black-pre-crystal
          tw-relative
        "
				switchedClass="
          tw-shadow-xl
          tablet:tw-shadow-none
          tw-z-50
        "
			>
				<svelte:fragment slot="switch-true">
					<svg
						class="tw-w-[18px] tw-stroke-raisin-black dark:tw-stroke-white"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M20 20L4 4.00003M20 4L4.00002 20" stroke-width="2" stroke-linecap="round" />
					</svg>
				</svelte:fragment>

				<svelte:fragment slot="switch-false">
					<svg
						class="tw-w-[24px] tw-fill-raisin-black dark:tw-fill-white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 478.703 478.703"
					>
						<path
							d="M454.2 189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8 7.1-27.9-3.2-38.1l-29.8-29.8c-5.6-5.6-13-8.7-20.9-8.7-6.2 0-12.1 1.9-17.1 5.5l-27.8 19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2a29.54 29.54 0 00-29.2-24.7h-42.1c-14.5 0-26.8 10.4-29.2 24.7l-5.8 34c-11.2 3.5-22.1 8.1-32.5 13.7l-27.5-19.8c-5-3.6-11-5.5-17.2-5.5-7.9 0-15.4 3.1-20.9 8.7l-29.9 29.8c-10.2 10.2-11.6 26.3-3.2 38.1l20 28.1c-5.5 10.5-9.9 21.4-13.3 32.7l-33.2 5.6a29.54 29.54 0 00-24.7 29.2v42.1c0 14.5 10.4 26.8 24.7 29.2l34 5.8c3.5 11.2 8.1 22.1 13.7 32.5l-19.7 27.4c-8.4 11.8-7.1 27.9 3.2 38.1l29.8 29.8c5.6 5.6 13 8.7 20.9 8.7 6.2 0 12.1-1.9 17.1-5.5l28.1-20c10.1 5.3 20.7 9.6 31.6 13l5.6 33.6a29.54 29.54 0 0029.2 24.7h42.2c14.5 0 26.8-10.4 29.2-24.7l5.7-33.6c11.3-3.5 22.2-8 32.6-13.5l27.7 19.8c5 3.6 11 5.5 17.2 5.5 7.9 0 15.3-3.1 20.9-8.7l29.8-29.8c10.2-10.2 11.6-26.3 3.2-38.1l-19.8-27.8c5.5-10.5 10.1-21.4 13.5-32.6l33.6-5.6a29.54 29.54 0 0024.7-29.2v-42.1c.2-14.5-10.2-26.8-24.5-29.2zm-2.3 71.3c0 1.3-.9 2.4-2.2 2.6l-42 7c-5.3.9-9.5 4.8-10.8 9.9-3.8 14.7-9.6 28.8-17.4 41.9-2.7 4.6-2.5 10.3.6 14.7l24.7 34.8c.7 1 .6 2.5-.3 3.4l-29.8 29.8c-.7.7-1.4.8-1.9.8-.6 0-1.1-.2-1.5-.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-.6-13.1 7.8-27.2 13.6-41.9 17.4-5.2 1.3-9.1 5.6-9.9 10.8l-7.1 42c-.2 1.3-1.3 2.2-2.6 2.2h-42.1c-1.3 0-2.4-.9-2.6-2.2l-7-42c-.9-5.3-4.8-9.5-9.9-10.8-14.3-3.7-28.1-9.4-41-16.8-2.1-1.2-4.5-1.8-6.8-1.8-2.7 0-5.5.8-7.8 2.5l-35 24.9c-.5.3-1 .5-1.5.5-.4 0-1.2-.1-1.9-.8l-29.8-29.8c-.9-.9-1-2.3-.3-3.4l24.6-34.5c3.1-4.4 3.3-10.2.6-14.8-7.8-13-13.8-27.1-17.6-41.8-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2c-1.3-.2-2.2-1.3-2.2-2.6v-42.1c0-1.3.9-2.4 2.2-2.6l41.7-7c5.3-.9 9.6-4.8 10.9-10 3.7-14.7 9.4-28.9 17.1-42 2.7-4.6 2.4-10.3-.7-14.6l-24.9-35c-.7-1-.6-2.5.3-3.4l29.8-29.8c.7-.7 1.4-.8 1.9-.8.6 0 1.1.2 1.5.5l34.5 24.6c4.4 3.1 10.2 3.3 14.8.6 13-7.8 27.1-13.8 41.8-17.6 5.1-1.4 9-5.6 9.9-10.8l7.2-42.3c.2-1.3 1.3-2.2 2.6-2.2h42.1c1.3 0 2.4.9 2.6 2.2l7 41.7c.9 5.3 4.8 9.6 10 10.9 15.1 3.8 29.5 9.7 42.9 17.6 4.6 2.7 10.3 2.5 14.7-.6l34.5-24.8c.5-.3 1-.5 1.5-.5.4 0 1.2.1 1.9.8l29.8 29.8c.9.9 1 2.3.3 3.4l-24.7 34.7c-3.1 4.3-3.3 10.1-.6 14.7 7.8 13.1 13.6 27.2 17.4 41.9 1.3 5.2 5.6 9.1 10.8 9.9l42 7.1c1.3.2 2.2 1.3 2.2 2.6v42.1h-.1z"
						/><path
							d="M239.4 136.001c-57 0-103.3 46.3-103.3 103.3s46.3 103.3 103.3 103.3 103.3-46.3 103.3-103.3-46.3-103.3-103.3-103.3zm0 179.6c-42.1 0-76.3-34.2-76.3-76.3s34.2-76.3 76.3-76.3 76.3 34.2 76.3 76.3-34.2 76.3-76.3 76.3z"
						/>
					</svg>
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
            prev-arr
            tw-hidden
            tablet:tw-block
            tw-bg-white
            dark:tw-bg-raisin-black-pre-crystal
            tw-p-3
            tw-rounded-full
            tw-aspect-square
            tw--rotate-90
            active:tw-translate-x-2
            tw-duration-250
          "
				>
					<svg
						class="
              tw-transition-all
              tw-duration-500
              tw-w-[24px]
              tw-fill-raisin-black
              dark:tw-fill-white
            "
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 47.255 47.255"
					>
						<path
							d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
						/>
					</svg>
				</button>

				<button
					class="
            next-arr
            tw-hidden
            tablet:tw-block
            tw-bg-white
            dark:tw-bg-raisin-black-pre-crystal
            tw-p-3
            tw-rounded-full
            tw-aspect-square
            tw-rotate-90
            active:tw--translate-x-2
            tw-duration-250
          "
				>
					<svg
						class="
              tw-transition-all
              tw-duration-500
              tw-w-[24px]
              tw-fill-raisin-black
              dark:tw-fill-white
            "
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 47.255 47.255"
					>
						<path
							d="M46.255 35.941a.997.997 0 01-.707-.293l-21.921-21.92-21.92 21.92a.999.999 0 11-1.414-1.414L22.92 11.607a.999.999 0 011.414 0l22.627 22.627a.999.999 0 01-.706 1.707z"
						/>
					</svg>
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
	bind:open={drawerMenuVisible}
	class="
    tw-p-0
    tablet:tw-p-3
    tw-backdrop-blur
  "
	containerClass="
    tw-relative
    tw-bg-white-crystal
    dark:tw-bg-raisin-black-pre-crystal
    tw-text-raisin-black
    dark:tw-text-white
    tw-rounded-none
    tablet:tw-rounded-xl
  "
	positionSide="left"
>
	{#if menuType === 'sources'}
		<div
			class="
        tw-h-full
        tw-grid
        tw-grid-rows-3
      "
			on:touchend={() => (drawerMenuVisible = false)}
			on:mouseup={() => (drawerMenuVisible = false)}
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
		</div>
	{:else if menuType === 'settings'}
		<div class="tw-h-full tw-p-6">
			<h2 class="tw-text-2xl tw-text-center tw-mb-6">Settings</h2>

			<div class="tw-space-y-3">
        <ToggleTitle bind:toggled={$themeStore.darkTheme} title="Dark mode" />
        <ToggleTitle bind:toggled={$svelteToastStore} title="Toasts with color" />
      </div>
		</div>
	{/if}
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
