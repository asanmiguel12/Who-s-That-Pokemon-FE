import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isLocal = process.env.LOCAL === 'true'

export default defineConfig({
  plugins: [react()],
  server: {
    port: isLocal ? 3000 : 8081,
    proxy: {
      '/api': {
        target: isLocal
          ? 'http://localhost:3001'
          : 'https://whos-that-pokemon-be.onrender.com',
        changeOrigin: true,
        secure: !isLocal,
      },
    },
  },
})