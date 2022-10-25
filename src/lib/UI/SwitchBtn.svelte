<script lang="ts">
  import type { TransitionConfig } from 'svelte/transition'

  export let transitionProps = {};
  export let transitionType: (node: HTMLElement, props: {}) => TransitionConfig;
	export let switchValue = false;
  export let switchedClass = '';
</script>

<button
  on:click
	class={`
    out-in-transition
    ${$$restProps.class}
    ${switchValue ? switchedClass : ''}
  `}
>
	{#if switchValue}
		<div transition:transitionType={transitionProps}>
			<slot name="switch-true" />
		</div>
	{:else}
		<div transition:transitionType={transitionProps}>
			<slot name="switch-false" />
		</div>
	{/if}
</button>

<style>

</style>