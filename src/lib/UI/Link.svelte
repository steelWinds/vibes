<script lang="ts">
  export let link: string = "";
</script>

{#if link}
  <a
    href={link}
    class={`
      ${$$restProps.class}
      `
    }>
    <slot />
  </a>
{/if}