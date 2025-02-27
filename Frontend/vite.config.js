import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],
  server : {
    allowedHosts: ['943c-2409-40c1-3024-3ce0-75e2-d867-6947-887a.ngrok-free.app'],
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer'],
  },
  resolve: {
    alias: {
      '@react-pdf/renderer': '@react-pdf/renderer',
    },
  },
  
})
