/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'lato': '\'Lato\', sans-serif'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
