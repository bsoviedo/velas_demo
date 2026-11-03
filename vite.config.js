import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base path so GitHub Pages works automatically regardless of repo name
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: false,
  }
});
