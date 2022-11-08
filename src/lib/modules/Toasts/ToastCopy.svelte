<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import copy from 'copy-to-clipboard';

	let titleRef: HTMLSpanElement;
	let copied = false;

	const onCopy = () => {
		if (copied) return;

		copied = copy(titleRef.innerText);
	};

	export let title = 'Default text';
	export let toastId: string;
</script>

<button
	class="
    out-in-transition
    tw-justify-start
    tw-items-center
    tw-w-full
    tw-h-full
    tw-py-2
    tw-pb-3
    tw-px-3
  "
  data-toast-id={toastId}
	on:click={onCopy}
>
	{#if !copied}
		<span
			bind:this={titleRef}
			transition:fly={{
				duration: 250,
				x: 100,
				easing: cubicInOut
			}}
		>
			{title}
		</span>
	{:else}
		<span
			transition:fly={{
				duration: 250,
				x: -100,
				easing: cubicInOut
			}}
		>
			Copied!
		</span>
	{/if}
</button>
