<script lang="ts">
  import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import clickOutside from '@/actions/click-outside';
  import addKeyListener from '@/modules/add-key-listener/addKeyListener'

  let backdropVisible = false;

  $: if (open) {
    backdropVisible = true;
  }

	export let open = false;
	export let containerClass = '';
	export let positionSide: 'left' | 'right' = 'left';

  onMount(() => {
		const removeListener = addKeyListener({
			callback: () => open = false,
			target: window,
			keyCode: 'Escape'
		});

    return removeListener
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
      on:outroend={() => backdropVisible = false}
      class={`
        tw-h-full
        tw-fixed
        tw-z-30
        tw-top-0
        tw-w-[55vmin]
        ${positionSide === 'right' ? 'tw-right-0' : 'tw-left-0'}
        ${$$restProps.class}
      `}
      use:clickOutside={{
        callback: () => open = false
      }}
    >
      <div
        class={`
          tw-h-full
          tw-duration-250
          ${containerClass}
        `}
      >
        <slot />
      </div>
    </div>
  </div>
{/if}