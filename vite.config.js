import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://user-service-production-94d1.up.railway.app',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});
