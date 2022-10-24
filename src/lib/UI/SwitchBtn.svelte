<script lang="ts">
  export let switchValue: boolean = false;
</script>

<button
  class={`
    ${$$restProps.class}
  `}
>
  {#if switchValue}
    <div>
      <slot name="switch-true" />
    </div>
  {:else}
    <div>
      <slot name="switch-false" />
    </div>
  {/if}
</button>