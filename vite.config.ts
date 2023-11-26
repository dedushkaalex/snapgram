import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslint()],
  server: {
    port: 3000,
    host: true,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@app', replacement: fileURLToPath(new URL('./src/app/', import.meta.url)) },
      { find: '@pages', replacement: fileURLToPath(new URL('./src/pages/', import.meta.url)) },
      { find: '@widgets', replacement: fileURLToPath(new URL('./src/widgets/', import.meta.url)) },
      { find: '@features', replacement: fileURLToPath(new URL('./src/features/', import.meta.url)) },
      { find: '@entities', replacement: fileURLToPath(new URL('./src/entities/', import.meta.url)) },
      { find: '@shared', replacement: fileURLToPath(new URL('./src/shared/', import.meta.url)) },
     
    ],
  },
});
