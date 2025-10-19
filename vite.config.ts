import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api-worker': {
        target: 'https://worker-service-sy1z.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-worker/, ''),
      },
    },
  }
})
