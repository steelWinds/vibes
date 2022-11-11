<script lang="ts">
	import type { Swiper as ISwiper } from 'swiper/types';
	import sourceStackStore from '@/stores/storage/source-type-stack';

	import debounced from 'lodash-es/debounce';
	import { createEventDispatcher } from 'svelte';
	import { Swiper } from 'swiper/svelte';

	const dispatch = createEventDispatcher();

	const debouncedIndexChanged = debounced(
		(event: CustomEvent<[swiper: ISwiper]>) => {
			const [swiper] = event.detail;

			dispatch('indexChanged', {
				...swiper
			});
		},
		100
	);
</script>

<Swiper {...$$restProps} on:activeIndexChange={debouncedIndexChanged}>
	<slot />
</Swiper>
