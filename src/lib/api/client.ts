import axios from 'axios';
import { clientConfig } from '../../config/env/client';

const apiClient = axios.create({
	baseURL: `${clientConfig.apiUrl}/api/v1`,
	timeout: 10000,
	withCredentials: true
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.error('Unauthorized, redirect to login or refresh token');
		}
		return Promise.reject(error);
	}
);

export default apiClient;
