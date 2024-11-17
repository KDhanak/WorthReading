import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	// Load environment variables based on the current mode
	const env = loadEnv(mode, process.cwd(), '');
	const isProduction = env.VITE_DEPLOYMENT === 'true';

	const baseURL = isProduction ? env.VITE_BACKEND_URL : 'http://localhost:5000';
	console.log(baseURL);

	return {
		base: '/',
		plugins: [react()],
		define: {
			'process.env': env,
		},
		server: {
			proxy: {
				'/api': {
					target: baseURL,
					changeOrigin: true,
					secure: isProduction,
				},
			},
		},
	};
});
