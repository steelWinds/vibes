interface IKeyCodeHandlerType {
	keyCode: string;
	callback: () => void;
}
interface IRedirectEventParams extends IKeyCodeHandlerType {
	event: Event;
}
interface IKeyListenerParams extends IKeyCodeHandlerType {
	target: HTMLElement | (Window & typeof globalThis);
	eventType?: 'up' | 'down' | 'press';
	listenerProps?: AddEventListenerOptions;
}

export type { IKeyListenerParams, IRedirectEventParams, IKeyCodeHandlerType };
