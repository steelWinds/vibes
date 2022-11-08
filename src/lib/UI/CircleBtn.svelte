<script lang="ts"></script>

<button
  class={`
    tw-grid
    tw-place-items-center
    tw-transition-all
    tw-duration-250
    custom
    tw-w-[42px]
    tw-rounded-full
    tw-aspect-square
    tw-bg-white
    dark:tw-bg-raisin-black
    ${$$restProps.class}
  `}
  on:click
>
  <slot />
</button>