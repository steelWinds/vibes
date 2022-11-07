import type { IRedirectEventParams } from './types/Params';

const redirectKeyEvent = (props: IRedirectEventParams) => {
	const { event, keyCode, callback } = props;

	const keyEvent = event as KeyboardEvent;

	if (keyEvent.code === keyCode) {
		callback();
	}
};

export default redirectKeyEvent;
