<script lang="ts">
	import { Tag } from 'carbon-components-svelte';
	import Link from '@/lib/UI/Link.svelte';

	export let link = '';
</script>

<Link {link} target="_blank">
	<Tag class="custom-tag">
		<slot />
	</Tag>
</Link>
