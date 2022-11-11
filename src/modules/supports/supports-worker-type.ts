const supportsWorkerType = () => {
	let supports = false;

	const tester: any = {
		get type() {
			return (supports = true);
		}
	};

	try {
		new Worker('blob://', tester);
	} finally {
		// eslint-disable-next-line no-unsafe-finally
		return supports;
	}
};

export default supportsWorkerType;
