interface Params {
	callback: () => void;
	target: HTMLElement | (Window & typeof globalThis);
	keyCode: string | number;
	eventType?: 'up' | 'down' | 'press';
	listenerProps?: AddEventListenerOptions;
}

export type { Params };
