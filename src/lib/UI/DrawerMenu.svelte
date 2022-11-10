<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import clickOutside from '@/actions/click-outside';
	import addKeyListener from '@/modules/add-key-listener/addKeyListener';

	let backdropVisible = false;

	export let open = false;
	export let containerClass = '';
	export let containerVisibleClasses = '';
	export let positionSide: 'left' | 'right' = 'left';

	onMount(() => {
		const removeListener = addKeyListener({
			callback: () => (open = false),
			target: window,
			keyCode: 'Escape'
		});

		return removeListener;
	});
</script>

{#if open}
	<div
		class="
      tw-fixed
      tw-left-0
      tw-top-0
      tw-w-full
      tw-h-full
      tw-z-[9999999]
    "
	>
		<div
			transition:fly={{
				duration: 250,
				x: -300,
				easing: cubicInOut
			}}
			class={`
        tw-h-full
        tw-fixed
        tw-z-30
        tw-top-0
        tw-w-full
        tablet:tw-w-[45vmax]
        ${positionSide === 'right' ? 'tw-right-0' : 'tw-left-0'}
        ${$$restProps.class}
      `}
			use:clickOutside={{
				callback: () => (open = false)
			}}
			on:introend={() => (backdropVisible = true)}
			on:outroend={() => (backdropVisible = false)}
		>
			<div
				class={`
          tw-shadow-md
          tw-shadow-raisin-black-crystal
          dark:tw-shadow-electric-blue-crystal
          tw-flex
          tw-flex-col
          tw-h-full
          tw-duration-250
          tw-relative
          tablet:tw-pb-0
          ${containerClass}
          ${backdropVisible ? containerVisibleClasses : ''}
        `}
			>
				<slot />

				<div class="tw-relative">
					<button
						class="
              tw-sticky
              tw-left-0
              tw-bottom-0
              tw-grid
              tablet:tw-hidden
              tw-place-items-center
              tw-w-full
              tw-text-white
              dark:tw-text-raisin-black
              tw-bg-raisin-black
              dark:tw-bg-white
              tw-p-[4vmin]
              tw-text-xl
              tw-duration-250
            "
						on:click={() => {
							open = false;
						}}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}