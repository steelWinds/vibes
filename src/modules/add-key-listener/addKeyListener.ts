import type { IKeyListenerParams } from './types/Params';

import redirectKeyEvent from './redirectKeyEvent';

const addKeyListener = (params: IKeyListenerParams) => {
	const {
		callback,
		target,
		keyCode,
		eventType = 'up',
		listenerProps = {}
	} = params ?? {};

	const selectedEventType: 'keyup' | 'keydown' | 'keypress' = `key${eventType}`;

	const handler = (event: Event) => {
		redirectKeyEvent({ event, keyCode, callback });
	};

	target.addEventListener(selectedEventType, handler, listenerProps);

	return () => {
		target.removeEventListener(selectedEventType, handler, listenerProps);
	};
};

export default addKeyListener;
