<script lang="ts">
	import BarLoader from 'svelte-loading-spinners/BarLoader.svelte';

	export let size: string;
</script>

<span
	class="
    tw-inline-block
    tw-w-fit
    tw-overflow-hidden
    tw-rounded-xl
  "
>
	<BarLoader {size} color="#2C75FF" unit="px" duration="1.25s" />
</span>
