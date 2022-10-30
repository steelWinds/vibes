interface Props {
	callback: () => void;
	exclude?: string[];
}

const clickOutside = (node: Node, props: Props) => {
	const { callback } = props;

	const handler = (event: Event) => {
		const composed = event.composedPath();
		const target = event.target as HTMLElement;
		const parentTarget = target.parentElement as HTMLElement;

		if (target?.dataset?.ignoreOutside || parentTarget?.dataset?.ignoreOutside) {
			return;
		}

		if (target?.dataset?.ignoreOutside) return;

		if (!composed.includes(node) && target && !node.isSameNode(target)) {
			callback();
		}
	};

	document.addEventListener('click', handler, true);
	document.addEventListener('touchend', handler, true);

	return {
		destroy() {
			document.removeEventListener('click', handler, true);
			document.removeEventListener('touchend', handler, true);
		}
	};
};

export default clickOutside;
