import {defineConfig} from 'vite';
import {resolve} from 'path';
import vitePluginHandlebarsPrecompile from './vite-plugin-handelbars-precompile';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    server: {
        port: 3000,
    },
    preview: {
      port: 3000,
    },
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
            },
            output: {
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
    plugins: [vitePluginHandlebarsPrecompile()],
});
