import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        // هذا الجزء ضروري لكي يعمل Vite عبر الشبكة المحلية (Local Network)
        host: '0.0.0.0', 
        port: 5173,
        strictPort: true,
        hmr: {
            // نضع الـ IP الخاص بجهازك لضمان عمل التحديث اللحظي (Hot Reload)
            host: '192.168.1.110',
        },
        cors: {
            origin: '*', // السماح لجميع المصادر لتجنب خطأ CORS Blocked
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx', // تأكد أن امتداد ملفك هو .jsx أو .js حسب مشروعك
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});