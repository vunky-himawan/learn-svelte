import { toast, type TToast } from '$stores/toast';

export function showToast(opts: Omit<TToast, 'toastStatus'>) {
	toast.set({
		type: opts.type ?? 'default',
		title: opts.title ?? '',
		message: opts.message ?? '',
		duration: opts.duration ?? '3s',
		toastStatus: true
	});
}
