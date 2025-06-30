/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'amazon-blue': '#232f3e',
        'amazon-blue-light': '#37475a',
        'amazon-orange': '#ff9900',
        'amazon-orange-dark': '#e68900',
        'amazon-red': '#b12704'
      }
    },
  },
  plugins: [],
}
