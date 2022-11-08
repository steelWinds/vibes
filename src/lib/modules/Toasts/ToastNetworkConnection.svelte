<script lang="ts">
	export let title = 'Default text';
	export let toastId: string;
</script>

<article
	class="
    out-in-transition
    tw-justify-start
    tw-items-center
    tw-w-full
    tw-h-full
    tw-py-2
    tw-px-3
  "
  data-toast-id={toastId}
>
  <h3>
    { title }
  </h3>
</article>
