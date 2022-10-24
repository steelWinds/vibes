<script lang="ts">
  import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

  export let containerClass: string = '';
  export let positionSide: string = 'left';
  export const toggleVisible = (value?:boolean) => {
    isVisible = value ?? !isVisible;

    return isVisible;
  }

  let isVisible: boolean = false;
</script>

{#if isVisible}
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
      ${ positionSide === 'right' ? 'tw-right-0' : 'tw-left-0' }
      ${ $$restProps.class }
    `
    }
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