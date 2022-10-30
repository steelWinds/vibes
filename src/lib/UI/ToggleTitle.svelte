<script lang="ts">
  import { Toggle } from "carbon-components-svelte";


  export let title: string;
  export let toggled: boolean;
</script>

<section
  class="
    tw-flex
    tw-flex-col
    tw-space-y-3
    mobile:tw-flex-row
    mobile:tw-space-y-0
    tw-w-full
    tw-items-center
    tw-justify-between
  "
>
  <h3 class="tw-text-xl">
    { title }
  </h3>

  <Toggle
    bind:toggled
    class="custom-toggle"
    hideLabel
    labelA=""
    labelB=""   
    on:toggle
  />
</section>