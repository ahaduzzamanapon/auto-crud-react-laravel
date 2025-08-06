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
                'neumorphic-light': '8px 8px 15px #d1d1d1, -8px -8px 15px #ffffff',
                'neumorphic-inset': 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff',
            }
        },
    },

    plugins: [forms],
};
