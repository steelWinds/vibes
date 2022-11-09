<script lang="ts">
  import type { IImageData } from '@/types/API/Unsplash/DataTypes/IImageData'

  import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
  import lazyLoad from '@/actions/lazy-load';
  import unsplashImageQualityStore from '@/stores/settings/unsplash-image-quality';
  import sourceTypeStore from '@/stores/settings/source-type';
  import SelectedItem from '@/lib/UI/SelectedItem.svelte'
  import UserItem from '@/lib/UI/UserItem.svelte'
  import CircleIcon from '@/lib/UI/CircleIcon.svelte';

  export let image: IImageData | any;
</script>

<SelectedItem
  state={
    $sourceTypeStore.sourcesStack?.has(
      image?.urls?.[$unsplashImageQualityStore]
    )}
  class="tw-h-full"
>
  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <UserItem user={image.user} class="tw-h-full">
    <button
      class="tw-block tw-w-full tw-h-full"
      on:click
    >
      <img
        class={`
            img-hide-alt
            tw-w-full
            tw-h-full
            tw-block
            tw-object-fit
        `}
        use:lazyLoad={{
          ...image,
          src: image?.urls?.[$unsplashImageQualityStore],
          parentPreloaderClass: ['tw-animate-pulse'],
          imagePreloaderClass: ['tw-opacity-0'],
          defaultAlt: 'Colored image',
          defaultColorPlug: 'rgb(146 144 146)'
        }}
      />
    </button>
  </UserItem>

  <svelte:fragment slot="selected-state">
    <div
      class="
          tw-absolute
          tw-left-1/2
          tw-top-1/2
          tw--translate-x-1/2
          tw--translate-y-1/2
        "
    >
      <div
        transition:scale={{
          duration: 250,
          easing: cubicInOut
        }}
      >
        <CircleIcon>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="dark:tw-fill-electric-blue tw-fill-raisin-black">
            <path
              d="M34.459 1.375a2.999 2.999 0 00-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 10-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 004.15-.884L35.343 5.524a2.999 2.999 0 00-.884-4.149z" />
          </svg>
        </CircleIcon>
      </div>
    </div>
  </svelte:fragment>
</SelectedItem>