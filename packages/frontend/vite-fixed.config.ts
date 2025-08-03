import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true,
    // Fix for crypto.hash issue in Vite 6.x
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@contexts': resolve(__dirname, 'src/contexts'),
      '@modules': resolve(__dirname, 'src/modules')
    }
  },
  define: {
    // This is required for Cesium
    CESIUM_BASE_URL: JSON.stringify('/cesium/'),
    global: 'globalThis'
  },
  optimizeDeps: {
    // Fix for Vite 6.x crypto.hash issue
    force: true,
    exclude: ['cesium'],
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      'axios',
      'framer-motion',
      'lucide-react',
      'recharts'
    ],
    // Fix for Vite 6.x dependency optimization
    esbuildOptions: {
      target: 'es2020'
    }
  },
  esbuild: {
    // Ensure compatibility
    target: 'es2020'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          cesium: ['cesium'],
          charts: ['recharts'],
          ui: ['framer-motion', 'lucide-react', '@headlessui/react', '@heroicons/react']
        }
      }
    },
    target: 'esnext',
    sourcemap: true
  },
  css: {
    postcss: {
      plugins: []
    }
  }
})
