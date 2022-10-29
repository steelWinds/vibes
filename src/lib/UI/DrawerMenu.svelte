<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import clickOutside from '@/actions/click-outside';

	export let open = false;
	export let containerClass = '';
	export let positionSide: 'left' | 'right' = 'left';
	export const toggleVisible = (value?: boolean) => {
		open = value ?? !open;

		return open;
	};
</script>

{#if open}
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
      ${positionSide === 'right' ? 'tw-right-0' : 'tw-left-0'}
      ${$$restProps.class}
    `}
		use:clickOutside={{
			callback: () => toggleVisible(false)
		}}
	>
		<div
			class={`
        tw-h-full
        ${containerClass}
      `}
		>
			<slot />
		</div>
	</div>
{/if}
