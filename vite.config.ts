import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'https://whos-that-pokemon-be.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
