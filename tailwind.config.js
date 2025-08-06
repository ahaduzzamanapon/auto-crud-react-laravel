import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                transparent: 'transparent',
            },
            boxShadow: {
                'neumorphic-light': '9px 9px 16px #d1d1d1, -9px -9px 16px #ffffff',
                'neumorphic-inset': 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
            }
        },
    },

    plugins: [forms],
};
