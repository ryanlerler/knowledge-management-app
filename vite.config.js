import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/datasets': {
        target: 'http://13.212.220.128',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
