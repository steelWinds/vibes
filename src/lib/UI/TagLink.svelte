<script lang="ts">
	import { Tag } from 'carbon-components-svelte';

	export let link = '';
</script>

<a href={link} target="_blank" rel="noreferrer noopener">
	<Tag class="custom-tag">
		<slot />
	</Tag>
</a>
