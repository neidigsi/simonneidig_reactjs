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
        bounceSlow: "bounceCustom 1s infinite",
      },
      fontFamily: {
        montserratAlt: ["'Montserrat Alternates'", "sans-serif"],
      },
      keyframes: {
        bounceCustom: {
          "0%, 100%": {
            transform: "translateY(-50%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
