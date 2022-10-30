interface RedirectEventParams {
	event: Event;
	keyCode: string;
	callback: () => void;
}
interface KeyListenerParams {
	callback: () => void;
	target: HTMLElement | (Window & typeof globalThis);
	keyCode: string;
	eventType?: 'up' | 'down' | 'press';
	listenerProps?: AddEventListenerOptions;
}

export type { KeyListenerParams, RedirectEventParams };
