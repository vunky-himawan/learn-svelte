import { goto } from '$app/navigation';
import { ACCESS_TOKEN } from '../common/constants/local-storage';

export const useAuth = () => {
	const access_token = localStorage.getItem(ACCESS_TOKEN);

	if (!access_token) {
		goto('/auth/login', { replaceState: true });
	}
};
