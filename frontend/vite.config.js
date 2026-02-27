import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Proxy is only used in development mode
  // For production, API calls go directly to the backend URL
  server: {
    proxy: process.env.NODE_ENV !== 'production' ? {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    } : undefined
  }
})