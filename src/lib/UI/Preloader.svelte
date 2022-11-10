<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let state: boolean;
	export let zIndex: string;
	export let position: 'absolute' | 'fixed';
</script>

{#if state}
	<div
		transition:fade={{
			duration: 250,
			easing: cubicInOut
		}}
		class="
      pending
      tw-rounded-2xl
      tw-block
      tw-left-0
      tw-top-0
      tw-w-full
      tw-h-full
      tw-bg-white-crystal
      dark:tw-bg-raisin-black-pre-crystal
      tw-grid
      tw-place-items-center
      tw-transition-color
      tw-duration-250
    "
		style:z-index={zIndex}
		style:position
	>
		<slot>
			<svg
				class="
          tw-w-[3vmax]
          tw-aspect-ratio
          tw-stroke-raisin-black
          dark:tw-stroke-electric-blue
          tw-transition-color
          tw-duration-250
        "
				viewBox="0 0 38 38"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g fill="none" fill-rule="evenodd">
					<g transform="translate(1 1)" stroke-width="2">
						<circle stroke-opacity=".5" cx="18" cy="18" r="18" />
						<path d="M36 18c0-9.94-8.06-18-18-18">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 18 18"
								to="360 18 18"
								dur="1s"
								repeatCount="indefinite"
							/>
						</path>
					</g>
				</g>
			</svg>
		</slot>
	</div>
{/if}
