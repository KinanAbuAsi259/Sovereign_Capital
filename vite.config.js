import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
//    server: {
//         host: '0.0.0.0', // يبقى هكذا ليسمح بالدخول من الخارج
//         port: 5173,
//         strictPort: true,
//         hmr: {
//             // استبدل هذا بـ IP جهازك الحقيقي (IPv4)
//             host: '192.168.1.110', 
//         },
//     },
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