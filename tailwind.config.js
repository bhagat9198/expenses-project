/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark-color-1": "#00005C",
        "brand-dark-color-2": "#3B185F",
        "brand-dark-color-3": "#C060A1",
        "brand-dark-color-4": "#F0CAA3",
        "brand-light-color-1": "#ECF9FF",
        "brand-light-color-2": "#FFFBEB",
        "brand-light-color-3": "#FFE7CC",
        "brand-light-color-4": "#F8CBA6",
      }
    },
  },
  plugins: [],
}
