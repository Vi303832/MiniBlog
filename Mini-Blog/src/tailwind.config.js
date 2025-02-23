module.exports = {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // burada projenizin dosya yolunu belirtiyorsunuz
    ],
    theme: {
        extend: {},
    },
    plugins: [

        require('tailwind-scrollbar-hide')

    ],
}
