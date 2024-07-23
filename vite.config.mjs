import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? 'https://techno-trace.github.io/GithubProfileExplorer/' : '/',
    plugins: [eslint({ cache: false }), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 5174,
      strictPort: true,
      origin:
        mode === 'production'
          ? 'https://techno-trace.github.io/GithubProfileExplorer'
          : 'http://localhost:5174',
    },
  };
});
