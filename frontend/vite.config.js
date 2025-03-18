// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    cache: true,
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    hmr: true,
  },
  optimizeDeps: {
    // Include the dependencies you want to pre-bundle
    include: [
      'react', 
      'react-dom'
    ],
    // Exclude problematic dependencies from optimization
    exclude: [
      // Add packages that are causing chunk errors
      '@mantine/core',
      '@mantine/hooks',
      '@emotion/react',
      'd3',
      'chart.js',
      'framer-motion'
    ]
  },
  esbuild: {
    target: 'esnext',
    tsconfigRaw: '{}',
  },
});