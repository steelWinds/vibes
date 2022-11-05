<script lang="ts">
  import RadioBtn from '@/lib/UI/RadioBtn.svelte'

  interface IValues {
    value: string;
    title?: string;
  }

  export let group: any;
  export let values: IValues[];
</script>

<div
  class={$$restProps.class}
>
  {#each values as {value, title}, idx (`tabs-item_${idx}`)}
    <RadioBtn bind:group value={value}>
      { title ?? value }
    </RadioBtn>
  {/each}
</div>



