<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
  import svelteToastStore from '@/stores/settings/svelte-toast-store'
	import config from '@/configs/svelte-toast-config';

	import '../app.css';
</script>

<svelte:head>
	<title>vibes</title>
</svelte:head>

<main
	class="
    tw-h-screen
    tw-w-screen
    tw-overflow-hidden
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
