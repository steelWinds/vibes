import { toast } from '@zerodevx/svelte-toast';
import ToastCopy from '@/lib/modules/ToastCopy.svelte';

const copyToast = (title: string, duration: number, limit?: boolean) => {
	if (limit) {
		toast.pop();
	}

	toast.push({
		component: {
			src: ToastCopy,
			props: {
				title
			},
			sendIdTo: 'toastId'
		},
		duration,
		reversed: true
	});
};

export default copyToast;
