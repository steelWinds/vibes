<script lang="ts">
  import modalConnectorStore from '@/stores/modules/modal-connector';
</script>

{#each Array.from($modalConnectorStore.modalStack.values()) as modal (modal.id)}
  <svelte:component
    this={modal.component}
    open={$modalConnectorStore.stateStack.get(modal.id) ?? true}
    {...modal.params}
    on:close={() => modalConnectorStore.closeModal(modal.id)}
  />
{/each}

