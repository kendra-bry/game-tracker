import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig((command, mode) => {
  return {
    root: 'src/',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          details: resolve(__dirname, 'src/details/index.html'),
          library: resolve(__dirname, 'src/library/index.html'),
          search: resolve(__dirname, 'src/search/index.html'),
          backlog: resolve(__dirname, 'src/backlog/index.html'),
        },
      },
    },
  };
});
