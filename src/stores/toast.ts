import { writable } from 'svelte/store';
import type { TVariant } from '../common/types/component';

export type TToast = {
	type?: TVariant;
	title?: string;
	message: string;
	duration?: string;
	toastStatus?: boolean;
};

export const toast = writable({
	type: 'default',
	title: '',
	message: '',
	duration: '3s',
	toastStatus: false
});
