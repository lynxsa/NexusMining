import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define global constants
    CESIUM_BASE_URL: JSON.stringify('/cesium/'),
  },
  optimizeDeps: {
    exclude: ['cesium'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
