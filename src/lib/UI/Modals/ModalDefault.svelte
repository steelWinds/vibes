<svelte:options immutable={true} />

<script lang="ts">
	import { Modal } from 'carbon-components-svelte';

	export let open: boolean;
	export let modalClass = '';
	export let content = '';
</script>

<Modal
	bind:open
	class={`custom-modal ${modalClass}`}
	{...$$restProps}
	on:open
	on:close
	on:submit
>
	{content}

	<slot />
</Modal>
