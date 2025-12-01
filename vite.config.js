import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';



export default defineConfig({
  plugins: [
    react(),
     cssInjectedByJsPlugin(),
    copy({
      targets: [
        { src: 'src/styles.css', dest: 'dist/' },
        { src: 'src/animations.css', dest: 'dist/' },
        { src: ['src/styles/*'], dest: 'dist/styles' },
        // { src: ['src/components/**/**/*.module.css'], dest: 'dist/components' },
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
    cssCodeSplit: false,
    sourcemap: true
  }
});
