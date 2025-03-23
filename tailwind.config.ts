/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    fontSize: {
      sm: "9pt",
      base: "11pt",
      lg: "11pt",
      xl: "20pt",
      "2xl": "25pt",
    },
    extend: {
      animation: {
        loader: "loading 0.5s infinite",
      },
    },
  },
  plugins: [],
};
