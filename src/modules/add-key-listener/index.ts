import type { Params } from './types/Params.type'

const addKeyListener = (params: Params) => {
  const {
    callback,
    target,
    keyCode,
    eventType = 'up',
    listenerProps = {}
  } = params ?? {};

  const selectedEventType: 'keyup' | 'keydown' | 'keypress' = `key${eventType}`;

  target.addEventListener(
    selectedEventType,
    (_event: Event) => {
      const event = _event as KeyboardEvent

      if (event.code === keyCode) {
        callback();

        console.log(event)
      }
    },
    listenerProps
  );
}

export default addKeyListener;