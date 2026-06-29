import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // Disable SPA fallback so Vite serves .jsx/.js modules correctly behind proxies
    middlewareMode: false,
  },
  preview: {
    port: 3000,
    host: true,
  },
  appType: 'spa',
});
