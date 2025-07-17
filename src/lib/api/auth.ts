import { formErrors } from '$stores/error';
import { isAxiosError } from 'axios';
import { clientConfig } from '../../config/env/client';
import apiClient from './client';
import { ACCESS_TOKEN, EXPIRES_IN } from '../../common/constants/local-storage';

export const login = async (email: string, password: string) => {
	try {
		const response = await apiClient.post(`/auth/login?client_id=${clientConfig.clientId}`, {
			email,
			password
		});

		const { access_token, expires_in } = response.data.data;

		localStorage.setItem(ACCESS_TOKEN, access_token);
		localStorage.setItem(EXPIRES_IN, expires_in);

		return { success: true };
	} catch (error) {
		if (isAxiosError(error)) {
			const errorResponse = error.response?.data;

			formErrors.update((prev) => {
				return {
					...prev,
					login: {
						title: errorResponse?.message || 'Login Error',
						message: errorResponse?.errors[0] || 'An error occurred during login. Please try again.'
					}
				};
			});
			return { success: false };
		}

		formErrors.update((prev) => ({
			...prev,
			login: 'An unexpected error occurred. Please try again later.'
		}));
		return { success: false };
	}
};
