import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    build: {
        target: 'es2015',
        rollupOptions: {
            output: { assetFileNames: 'videoary.min.[ext]' }
        },
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'Videoary',
            fileName: 'videoary',
            formats: ['es', 'umd', 'cjs', 'iife']
        },
        minify: 'esbuild'
    }
})