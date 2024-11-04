import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_DEPLOYMENT === 'true' ? import.meta.env.VITE_BACKEND_URL : 'http://localhost:5000'

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
				const { data } = await api.post('/api/auth/refresh-token');
				const newAccessToken = data.token;

				Cookies.set('accessToken', newAccessToken);

				api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

				return api(originalRequest);
			} catch (refreshError) {
				console.error('Token refresh failed', refreshError);
			}

		}
		return Promise.reject(error);
	}
);

export default api;
