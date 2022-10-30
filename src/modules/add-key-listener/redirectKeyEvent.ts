import type { RedirectEventParams } from './types/Params.type';

const redirectKeyEvent = (props: RedirectEventParams) => {
  const { event, keyCode, callback } = props;

  const keyEvent = event as KeyboardEvent;

  if (keyEvent.code === keyCode) {
    callback();
  }
}

export default redirectKeyEvent
