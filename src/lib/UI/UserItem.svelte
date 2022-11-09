<script lang="ts">
	import type { IUserData } from '@/types/API/Unsplash/DataTypes/IUserData';

	import Tag from '@/lib/UI/TagLink.svelte';

	export let user: IUserData;
</script>

<div
	class={`
    tw-relative
    ${$$restProps.class}
  `}
>
	<div class="tw-w-full tw-absolute tw-p-2">
		<Tag link={user?.links?.html}>
			<span class="tw-font-bold">Author</span>: {user.username}
		</Tag>
	</div>

	<slot />
</div>
