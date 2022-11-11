<script lang="ts">
	import { Modal } from 'carbon-components-svelte';

	export let modalClass: string;
	export let open: boolean;
</script>

<Modal
	bind:open
	class={`custom-modal ${modalClass}`}
	{...$$restProps}
	on:open
	on:close
	on:submit
>
	<slot />
</Modal>
