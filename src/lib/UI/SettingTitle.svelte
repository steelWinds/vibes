<script lang="ts">
	export let title: string;
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
	<h3 class="tw-text-xl tw-text-center">
		{title}
	</h3>

	<slot />
</section>
