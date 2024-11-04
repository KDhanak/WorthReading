import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current `mode`
  const env = loadEnv(mode, process.cwd(), '');

  const baseURL = env.VITE_DEPLOYMENT === 'true' ? env.VITE_BACKEND_URL : 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: baseURL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
