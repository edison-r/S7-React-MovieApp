/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}", // cubre Astro + React
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "ui-sans-serif", "system-ui"],
        Anton: ['"Anton"', 'cursive'],
        allura: ['"Allura"', 'cursive'],
      },
      fontSize: {
        '10xl': '10rem',
        '16xl': '16rem'
      }
    },
  },
  plugins: [],
};
