<script lang="ts">
	export let bgColor: string;
</script>

<button class={`tw-p-3 ${$$restProps.class}`} style:background={bgColor}>
	<slot />
</button>
