import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          cesium: ['cesium'],
          leaflet: ['leaflet', 'react-leaflet'],
          charts: ['recharts', 'd3', 'chart.js', 'react-chartjs-2'],
          animations: ['framer-motion', 'react-spring'],
          utils: ['lodash', 'dayjs', 'numeral'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    // Increase chunk size warning limit for large libraries
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    exclude: ['cesium'],
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      'axios',
      'framer-motion',
      'lucide-react',
      'recharts',
      'leaflet',
      'react-leaflet',
      'd3',
      'chart.js',
      'react-chartjs-2',
      'lodash',
      'dayjs',
      'numeral',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
    // Fix for Vite 6.x dependency optimization
    esbuildOptions: {
      target: 'es2020'
    },
    // Fix for Vite 6.x crypto.hash issue
    force: true
  },
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
      '@modules': resolve(__dirname, 'src/modules'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@hooks': resolve(__dirname, 'src/hooks')
    }
  },
  define: {
    // This is required for Cesium
    CESIUM_BASE_URL: JSON.stringify('/cesium/'),
    global: 'globalThis'
  },
  esbuild: {
    // Ensure compatibility
    target: 'es2020'
  },
  css: {
    postcss: {
      plugins: []
    }
  }
})
