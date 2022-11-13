import ModalDefault from '@/lib/UI/Modals/ModalDefault.svelte';
import { writable } from 'svelte/store';

type ModalPropsType = {
	content: string;
	modalHeading: string;
	modalClass?: string;
	passiveModal?: boolean;
};

type ModalObjectType = {
	component: typeof ModalDefault;
	params: ModalPropsType;
	id: string;
};

type ModalStackType = {
	modalStack: Map<string, ModalObjectType>;
	stateStack: Map<string, boolean>;
};

const createModalConnectorStore = () => {
	const { subscribe, update, set } = writable<ModalStackType>({
		modalStack: new Map(),
		stateStack: new Map()
	});

	const openModal = (id: string, params: ModalPropsType) => {
		update(($store) => {
			if (!$store.modalStack.has(id)) {
				$store.modalStack.set(id, { component: ModalDefault, params, id });
			}

			$store.stateStack.set(id, true);

			return $store;
		});
	};

	const closeModal = (id: string) => {
		update(($store) => {
			$store.stateStack.set(id, false);

			return $store;
		});
	};

	return {
		subscribe,
		update,
		set,
		openModal,
		closeModal
	};
};

const outputColorType = createModalConnectorStore();

export default outputColorType;
