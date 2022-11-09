<script lang="ts">
  export let state: boolean;
</script>

<div class={`tw-relative ${$$restProps.class}`}>
  <slot />

  {#if state}
    <slot name="selected-state" />
  {/if}
</div>