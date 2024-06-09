import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        primary: "#00BBAA",
        secondary: "#1D63AB",
        "light-grey": "#E8E8E8",
        "dark-grey": "#5F5F5F",
      },
      animation: {
        loader: "loading 0.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
