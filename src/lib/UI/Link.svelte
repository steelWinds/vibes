<script lang="ts">
	export let link = '';
  export let target: '_self' | '_blank'; 
</script>

{#if link}
	<a
		href={link}
    {target}
    rel="noopener noreferrer"
		class={`
      ${$$restProps.class}
      `}
	>
		<slot />
	</a>
{/if}
