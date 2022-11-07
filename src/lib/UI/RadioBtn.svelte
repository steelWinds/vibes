<script lang="ts">
	export let group: any;
	export let value: any;
</script>

<label
	class="
		tw-relative
		tw-cursor-pointer
		"
>
	<input
		bind:group
		{value}
		type="radio"
		name={$$restProps.name}
		class="
			tw-absolute
			tw-top-0
			tw-left-0
			tw-w-0
			tw-h-0
			tw-peer
      tw-opacity-0
		"
	/>

	<div
		class="
		tw-px-3
		tw-py-0.5
		tw-rounded-full
		tw-bg-white
    tw-text-raisin-black
		peer-checked:tw-bg-raisin-black
		dark:peer-checked:tw-bg-electric-blue
		peer-checked:tw-text-white
		tw-transition-colors
    tw-duration-250
    tw-text-center
		"
	>
		<p class="tw-inline-block">
			<slot />
		</p>
	</div>
</label>
