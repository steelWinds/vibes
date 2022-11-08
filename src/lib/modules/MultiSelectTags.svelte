<script lang="ts">
	import type { ObjectOption, Option } from 'svelte-multiselect';

	import MultiSelect from 'svelte-multiselect';
	import debounce from 'lodash-es/debounce';
	import { Moon } from 'svelte-loading-spinners';

	type T = $$Generic;

	let pendingState = false;
	let searchText = '';

	$: if (searchText) {
		onChange();
	}

	const onChange = debounce(async () => {
		pendingState = true;

		await promiseCallback(searchText);

		pendingState = false;
	}, 350);

	export let options: Array<T & ObjectOption> = [];
	export let promiseCallback: (searchText: string) => Promise<any>;
	export let selected: Array<T & Option> = [];
	export let maxSelect = Infinity;
	export let noMatchingOptionsMsg = 'Empty';
</script>

<div
	class={`
    custom-multiselect
    tw-relative
    ${$$restProps.class}
  `}
>
	<MultiSelect
		bind:selected
		bind:searchText
		loading={pendingState}
		{options}
		{maxSelect}
		{noMatchingOptionsMsg}
	>
		<Moon size="18" color="#2C75FF" unit="px" duration="1.3s" slot="spinner" />

		<svelte:fragment let:option slot="option">
			<slot name="option" {option} />
		</svelte:fragment>
	</MultiSelect>
</div>
