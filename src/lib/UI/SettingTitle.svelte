<script lang="ts">
	export let title: string;
	export let titleClass = '';
</script>

<section
	class={`
    tw-flex
    tw-flex-col
    mobile:tw-flex-row
    tw-w-full
    ${$$restProps.class}
  `}
>
	<h3 class={`tw-text-xl tw-text-center ${titleClass}`}>
		{title}
	</h3>

	<slot />
</section>
