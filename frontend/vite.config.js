import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
  plugins: [
    react(),
    tailwindcss()
  ],
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: parseInt(env.VITE_DEV_PORT) || 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{js,ts,jsx,tsx}', 'tests/**/*.test.{js,ts,jsx,tsx}'],
    setupFiles: './src/test-setup.js'
  }
}})
