// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-playfair)", ...fontFamily.serif],
        body: ["var(--font-zilla-slab)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
