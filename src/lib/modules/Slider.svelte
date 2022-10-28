<script lang="ts">
  import type { Swiper as ISwiper } from 'swiper/types'

  import debounced from 'lodash-es/debounce'
  import { createEventDispatcher } from 'svelte';
  import { Swiper } from 'swiper/svelte';

  const dispatch = createEventDispatcher();

  const debouncedIndexChanged = debounced((event: CustomEvent<[swiper: ISwiper]>) => {
    const [swiper] = event.detail;

    dispatch('indexChanged', {
      activeIndex: swiper.realIndex
    })
  }, 100)
</script>

<Swiper
  on:activeIndexChange={debouncedIndexChanged}
  {...$$restProps}
>
  <slot />
</Swiper>