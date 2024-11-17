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

			if (!originalRequest._retryCount) {
				originalRequest._retryCount = 1;
			} else {
				originalRequest._retryCount += 1;
			}

			if (originalRequest._retryCount <= 3) {
				try {
					console.error('Access token invalid or expired. Attempting re-authentication.');
					await api.post('/api/auth/refresh-token');
					return api(originalRequest);
				} catch (refreshError) {
					console.error('Token refresh failed, redirecting to login', refreshError);
				}
			} else {
				console.error('Token refresh attempts exceeded. Redirecting to login.');
			}
		}
		return Promise.reject(error);
	}
);

export default api;
