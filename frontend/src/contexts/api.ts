import axios from 'axios';

export const baseURL = import.meta.env.VITE_DEPLOYMENT === 'true' ? import.meta.env.VITE_BACKEND_URL : 'http://localhost:5000'

const api = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				console.error('Access token invalid ot expired. Attempting re-authentication.');
				await api.post('/api/auth/refresh-token');
				return api(originalRequest);
			} catch (refreshError) {
				console.error('Token refresh failed, redirecting to login', refreshError);
			}

		}
		return Promise.reject(error);
	}
);

export default api;
