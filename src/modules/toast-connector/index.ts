import type { SvelteComponent } from 'svelte'
import type { IToastConnector } from './types/Params'

import { get } from 'svelte/store'
import { toast } from '@zerodevx/svelte-toast';

const toastConnector = (component: typeof SvelteComponent, options: IToastConnector) => {
  const { limit, title, ...toastProps } = options;
  
  if (limit) {
    const toastStore: IToastConnector[] = get(toast)
    const firstToast = toastStore[0]
    
    if (firstToast?.component?.props?.limit) {
      toast.pop()
    }
  }

  toast.push({
    component: {
      src: component,
      props: {
        title,
        limit
      },
      sendIdTo: 'toastId'
    },
    ...toastProps,
  });
};

export default toastConnector;
