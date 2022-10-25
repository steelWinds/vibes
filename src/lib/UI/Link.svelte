<script lang="ts">
	export let link = '';
</script>

{#if link}
	<a
		href={link}
		class={`
      ${$$restProps.class}
      `}
	>
		<slot />
	</a>
{/if}
