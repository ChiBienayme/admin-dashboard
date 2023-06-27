import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/common/_variables.scss';`,
            },
        },
    },

    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src/'),
            '@': path.resolve(__dirname, './src/assets/scss/'),
            components: path.resolve(__dirname, './src/components/'),
            hooks: path.resolve(__dirname, './src/hooks/'),
            public: path.resolve(__dirname, './public/'),
            pages: path.resolve(__dirname, './src/pages'),
        },
    },
});
