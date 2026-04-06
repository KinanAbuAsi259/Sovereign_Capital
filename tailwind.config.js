export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                // تعريف اللون الذهبي (الماتي الفاخر)
                'accent': '#c5a059', 
                'primary': '#0b1c2d',
                'background-dark': '#13191f',
            },
        },
    },
    // ...
};