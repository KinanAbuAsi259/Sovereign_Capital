import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
   server: {
        host: '0.0.0.0', // السماح بالوصول من أي جهاز في الشبكة
        hmr: {
            host: '192.168.1.110', // 🛑 ضع هنا الـ IP الخاص بحاسوبك حصراً
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
