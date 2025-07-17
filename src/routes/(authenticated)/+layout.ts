import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';
import { ACCESS_TOKEN } from '../../common/constants/local-storage';

export const load: LayoutLoad = async () => {
	if (browser) {
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (!token) {
			throw redirect(302, '/auth/login');
		}
	}
};
