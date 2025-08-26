import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// This is the Vite configuration file. It is used to configure the Vite dev server and build process.
// For more information, see https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    eslint({
      fix: true,
      overrideConfigFile: path.resolve(__dirname, '..', '..', '.eslintrc.cjs'),
      include: ['src/**/*.{ts,tsx,js,jsx}'],
    }),
    checker({ typescript: { buildMode: true } }),
    tsconfigPaths(),
  ],

  server: {
    allowedHosts: true,
  },

  build: {
    outDir: path.resolve(__dirname, '..', 'build', 'client'),
  },
});
