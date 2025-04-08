/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx,css}"],
  darkMode: "class",
  theme: {
    fontSize: {
      sm: "9pt",
      base: "11pt",
      lg: "11pt",
      xl: "20pt",
      "2xl": "25pt",
    },
    extend: {
      fontFamily: {
        montserratAlt: ["'Montserrat Alternates'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
