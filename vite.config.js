import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: 'src/styles/styles.css', dest: 'dist/' },
        { src: 'src/styles/animations.css', dest: 'dist/' },
        { src: ['src/styles/*', '!src/styles/styles.css' , '!src/styles/animations.css'], dest: 'dist/styles' }
      ],
      hook: 'writeBundle'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'KlarUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: true
  }
});
