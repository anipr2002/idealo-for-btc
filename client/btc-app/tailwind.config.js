/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
      fontFamily: {
        ubuntu: ['Ubunto Mono', 'monospace'],
        studio: ['Studio Pro', 'sans-serif'],
        albert: ['Albert ExtraBold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}