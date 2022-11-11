<script lang="ts">
	import RadioBtn from '@/lib/UI/RadioBtn.svelte';

  type T = $$Generic;

	interface IValues {
		value: T;
		title?: string;
	}

	export let group: T;
	export let values: IValues[];
</script>

<div class={$$restProps.class}>
	{#each values as { value, title }, idx (`tabs-item_${idx}`)}
		<RadioBtn bind:group {value}>
			{title ?? value}
		</RadioBtn>
	{/each}
</div>
