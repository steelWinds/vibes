<script lang="ts">
	import type { TransitionConfig, EasingFunction } from 'svelte/transition';

	interface TransitionParams {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
	}

	export let transitionProps: TransitionParams = {};
	export let transitionType: (node: HTMLElement, props: TransitionParams) => TransitionConfig;
	export let switchValue = false;
	export let switchedClass = '';
</script>

<button
	class={`
    out-in-transition
    ${$$restProps.class}
    ${switchValue ? switchedClass : ''}
  `}
	on:click
>
	{#if switchValue}
		<div transition:transitionType={transitionProps} class="tw-pointer-events-none">
			<slot name="switch-true" />
		</div>
	{:else}
		<div transition:transitionType={transitionProps} class="tw-pointer-events-none">
			<slot name="switch-false" />
		</div>
	{/if}
</button>

<style>
</style>
