<script lang="ts">
	import Color from 'color';
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Navigation } from 'swiper';
	import { median } from '@/modules/median-cut';
	import 'swiper/css';

	let image: HTMLImageElement;
	let canvas: HTMLCanvasElement;

	$: showOptionsBtns = true;
	$: currentColor = '#ffff';
	$: alternateColor = Color(currentColor).negate().rotate(10).saturate(0.5).hex();

	const getSliderImage = (): HTMLImageElement => {
		const centerX = document.documentElement.clientWidth / 2;
		const centerY = document.documentElement.clientHeight / 2;

		return document.elementFromPoint(centerX, centerY) as HTMLImageElement;
	};

	const setCurrentColor = () => {
		const RGBColor = median(image, canvas, {
			depth: 1,
			maxDepth: 1
		});

		console.log(RGBColor);

		currentColor = Color(RGBColor?.[0]).hex();
	};

	const changeImage = () => {
		image = getSliderImage();

		if (image.complete) {
			setCurrentColor();
		}

		image.onload = () => {
			setCurrentColor();
		};
	};

	onMount(() => {
		window.addEventListener('keyup', (event) => {
			if (event.code !== 'Space') return;

			showOptionsBtns = !showOptionsBtns;
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
	<div
		class="
      tw-absolute
      tw-right-10
      tw-top-10
    "
	>
		{#if showOptionsBtns}
			<button
				transition:scale={{
					duration: 250
				}}
				class="
          custom
          tw-p-3
          tw-rounded-full
          tw-aspect-square
          tw-bg-white
          tw-relative
        "
				style:--pseudo-bg-color={currentColor}
			>
				<img src="/assets/ui-icons/menu.svg" class="tw-w-[18px]" alt="Menu icon" />
			</button>
		{/if}
	</div>

	<canvas
		bind:this={canvas}
		class="
      tw-absolute
      tw-left-[999999px]
      tw-top-[999999px]
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
		<button
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

		<Swiper
			modules={[Navigation]}
			navigation={{
				nextEl: '.next-arr',
				prevEl: '.prev-arr'
			}}
			class="
        tw-w-full
        tw-rounded-2xl
        tw-drop-shadow-2xl
        tw-aspect-square
        ultra-mobile:tw-aspect-auto
      "
			slidesPerView={1}
			loop
			on:slideChangeTransitionEnd={() => changeImage()}
		>
			{#each [...Array(4).keys()] as n}
				<SwiperSlide>
					<img
						src={`/assets/started-gifs/gif-${n + 1}.webp`}
						class="tw-h-[300px] tw-w-full tw-object-cover"
						alt={`Gif of ${n}`}
					/>
				</SwiperSlide>
			{/each}

			{#each [...Array(3).keys()] as n}
				<SwiperSlide>
					<img
						src={`/assets/started-gifs/image-${n + 1}.jpg`}
						class="tw-h-[300px] tw-w-full tw-object-cover"
						alt={`Image of ${n}`}
					/>
				</SwiperSlide>
			{/each}
		</Swiper>
	</div>
</div>
