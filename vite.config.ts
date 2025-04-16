import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
      react(),
      svgr({
      svgrOptions: {
        exportType: 'default',
        icon: true,
      },
        include: '**/*.svg'
    }),
    vanillaExtractPlugin({
      identifiers: 'short',
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/package/component/Select.tsx'),
      name: 'KokoReactSelect',
      fileName: () => 'Select.js',
      formats: ['es'],
    },
    outDir: 'src/package/dist',
    emptyOutDir: false,
    rollupOptions: {
      external: (source) => {
        return ['react', 'react-dom'].includes(source) || source.endsWith('.svg?react');
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
