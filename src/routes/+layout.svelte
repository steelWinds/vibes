<script lang="ts">
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import svelteToastStore from '@/stores/settings/svelte-toast-store';
  import themeStore from '@/stores/settings/theme-store';
  import toastConnector from '@/modules/toast-connector';
	import config from '@/configs/svelte-toast-config';
  import ToastNetworkConnection from '@/lib/modules/Toasts/ToastNetworkConnection.svelte';
  import { toast } from '@zerodevx/svelte-toast'

	import '../app.css';

  const showConnectionStatus = (status: boolean) => {
    const title = status ? 'Connection restored' : 'Connection error';
    const elementClass = status ? 'connection-restored' : 'connection-broken';

    toastConnector(ToastNetworkConnection, {
      limit: true,
      duration: status ? 3000 : 0,
      initial: status ? 1 : 0,
      title,
      classes: ['toast', elementClass],
    })
  }

  onMount(() => {
    themeStore.init()
  })
</script>

<svelte:head>
	<title>vibes</title>
</svelte:head>

<svelte:window 
  on:offline={() => showConnectionStatus(false)}
  on:online={() => showConnectionStatus(true)}
/>

<main
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
