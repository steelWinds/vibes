<script lang="ts">
  import type { ObjectOption } from 'svelte-multiselect';
  import type { ICollectionData } from '@/types/API/Unsplash/DataTypes/ICollectionData';

  import selectedCollectionsStore from '@/stores/storage/selected-collections';
  import unsplashImageQualityStore from '@/stores/settings/unsplash-image-quality';
  import themeStore from '@/stores/settings/theme-store';
  import svelteToastStore from '@/stores/settings/svelte-toast-store';
  import swiperControlsVisibleStore from '@/stores/settings/swiper-controls-visible';
  import setPrevSelectedImagesStore from '@/stores/settings/set-prev-selected-images';
  import outputColorType from '@/stores/settings/output-color-type';
  import searchCollections from '@/api/unsplash/search-collections';
  import colorsOutputType from '@/configs/colors-output-type';
	import unsplashQualities from '@/configs/unsplash-qualities';
  import { Toggle } from 'carbon-components-svelte';
  import SettingTitle from '@/lib/UI/SettingTitle.svelte';
  import MultiSelectTags from '@/lib/modules/MultiSelectTags.svelte';
  import Tabs from '@/lib/UI/Tabs.svelte';

  let unsplashCollections: Array<ObjectOption & ICollectionData> = [];

  const getCollections = async (query: string) => {
    const paginate = await searchCollections({
      query,
      per_page: 100
    });

    unsplashCollections = paginate.results.map((collection) => {
      const username = collection.user.username ?? 'No-Name';
      const label = `${username}: ${collection.title}`;

      return {
        label,
        username,
        ...collection
      };
    });
  };
</script>

<SettingTitle
  class="
    tw-space-y-3
    mobile:tw-flex-col
    tw-justify-between
    tw-items-center
    mobile:tw-items-start
  "
  titleClass="
    tw-font-bold
    tw-text-center
    tw-text-2xl
    mobile:tw-text-start
  "
  title="Unsplash"
>
  <SettingTitle
    class="
      mobile:tw-flex-col
      tw-items-center
      mobile:tw-items-start
      tw-space-y-3
    "
    title="Collections"
  >
    <MultiSelectTags
      bind:options={unsplashCollections}
      bind:selected={$selectedCollectionsStore}
      class="tw-self-stretch"
      maxSelect={5}
      noMatchingOptionsMsg="Oh! Empty!"
      promiseCallback={getCollections}
      searchParam="query"
      autocomplete
    >
      <svelte:fragment let:option slot="option">
        <div>
          <h4 class="tw-font-bold tw-font-lg tw-inline-block">
            {option.username}:
          </h4>

          <span class="tw-bg-electric-blue-crystal tw-font-bold">
            {option.title}
          </span>

          <div>
            Total images: <span class="tw-underline"
              >{option.total_photos}</span
            >
          </div>
        </div>
      </svelte:fragment>
    </MultiSelectTags>
  </SettingTitle>

  <SettingTitle
    class="
      mobile:tw-flex-col
      tw-items-center
      mobile:tw-items-start
      tw-space-y-3
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="Image's quality"
  >
    <Tabs
      class="
        tw-grid
        tw-grid-cols-1
        mobile:tw-grid-cols-4
        tw-gap-1.5
      "
      bind:group={$unsplashImageQualityStore}
      values={unsplashQualities}
    />
  </SettingTitle>
</SettingTitle>

<SettingTitle
  class="
    tw-space-y-3
    mobile:tw-flex-col
    tw-justify-between
    tw-items-center
    mobile:tw-items-start
  "
  titleClass="
    tw-font-bold
    tw-text-center
    tw-text-2xl
    mobile:tw-text-start
  "
  title="Theme"
>
  <SettingTitle
    class="
      tw-space-y-3
      mobile:tw-space-y-0
      mobile:tw-space-x-3
      tw-justify-between
      tw-items-center
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="Dark theme"
  >
    <Toggle
      bind:toggled={$themeStore.darkTheme}
      class="custom-toggle"
      hideLabel
      labelA=""
      labelB=""
      disabled={$themeStore.systemPreferences}
    />
  </SettingTitle>

  <SettingTitle
    class="
      tw-space-y-3
      mobile:tw-space-y-0
      mobile:tw-space-x-3
      tw-justify-between
      tw-items-center
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="System preferences"
  >
    <Toggle
      bind:toggled={$themeStore.systemPreferences}
      class="custom-toggle"
      hideLabel
      labelA=""
      labelB=""
    />
  </SettingTitle>
</SettingTitle>

<SettingTitle
  class="
    tw-space-y-3
    mobile:tw-flex-col
    tw-justify-between
    tw-items-center
    mobile:tw-items-start
  "
  titleClass="
    tw-font-bold
    tw-text-center
    tw-text-2xl
    mobile:tw-text-start
  "
  title="Other"
>
  <SettingTitle
    class="
      tw-space-y-3
      mobile:tw-space-y-0
      mobile:tw-space-x-3
      tw-justify-between
      tw-items-center
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="Toasts with color"
  >
    <Toggle
      bind:toggled={$svelteToastStore}
      class="custom-toggle"
      hideLabel
      labelA=""
      labelB=""
    />
  </SettingTitle>

  <SettingTitle
    class="
      tw-space-y-3
      mobile:tw-space-y-0
      mobile:tw-space-x-3
      tw-justify-between
      tw-items-center
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="Show prev selected images from internet in the list"
  >
    <Toggle
      bind:toggled={$setPrevSelectedImagesStore}
      class="custom-toggle"
      hideLabel
      labelA=""
      labelB=""
    />
  </SettingTitle>

  <SettingTitle
    class="
      tw-space-y-3
      mobile:tw-space-y-0
      mobile:tw-space-x-3
      tw-justify-between
      tw-items-center
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="Controls of slider visible"
  >
    <Toggle
      bind:toggled={$swiperControlsVisibleStore}
      class="custom-toggle"
      hideLabel
      labelA=""
      labelB=""
    />
  </SettingTitle>

  <SettingTitle
    class="
      mobile:tw-flex-col
      tw-items-center
      mobile:tw-items-start
      tw-space-y-3
    "
    titleClass="
      tw-text-center
      mobile:tw-text-start
    "
    title="Color output type"
  >
    <Tabs
      class="
        tw-grid
        tw-grid-cols-1
        mobile:tw-grid-cols-4
        tw-gap-1.5
      "
      bind:group={$outputColorType}
      values={colorsOutputType}
    />
  </SettingTitle>
</SettingTitle>