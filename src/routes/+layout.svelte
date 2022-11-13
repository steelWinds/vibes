<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import svelteToastStore from '@/stores/settings/svelte-toast-store';
	import themeStore from '@/stores/settings/theme-store';
	import toastConnector from '@/modules/toast-connector';
	import config from '@/configs/svelte-toast-config';
	import ToastNetworkConnection from '@/lib/modules/Toasts/ToastNetworkConnection.svelte';
	import Preloader from '@/lib/UI/Preloader.svelte';
	import BarLoader from '@/lib/UI/BarLoader.svelte';
	import ModalConnector from '@/lib/modules/ModalConnector.svelte';

	import '../app.css';

	let pendingOnMount = true;

	const showConnectionStatus = (status: boolean) => {
		const title = status ? 'Connection restored' : 'Connection error';
		const elementClass = status ? 'connection-restored' : 'connection-broken';

		toastConnector(ToastNetworkConnection, {
			limit: true,
			duration: status ? 3000 : 0,
			initial: status ? 1 : 0,
			title,
			classes: ['toast', elementClass]
		});
	};

	onMount(() => {
		themeStore.init();

		pendingOnMount = false;
	});
</script>

<svelte:head>
	<title>vibes</title>
</svelte:head>

<svelte:window
	on:offline={() => showConnectionStatus(false)}
	on:online={() => showConnectionStatus(true)}
/>

<Preloader state={pendingOnMount} zIndex="99999" position="fixed">
	<BarLoader size="110" />
</Preloader>

<ModalConnector />

<main
	data-sveltekit-prefetch
	class="
    tw-h-screen
    tw-w-full
    tw-relative
  "
>
	<slot />
</main>

{#if $svelteToastStore}
	<div class="custom-toast">
		<SvelteToast options={config(1000)} />
	</div>
{/if}
