import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: ["14px", "20px"],
      base: ["14px", "20px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
      "2xl": ["32px", "40px"],
    },
    extend: {
      colors: {
        primary: "#00BBAA",
        secondary: "#1D63AB",
        "light-grey": "#E8E8E8",
        "dark-grey": "#5F5F5F",
      },
      animation: {
        'loader': 'loading 0.5s infinite',
      }
    },
  },
  plugins: [],
};
export default config;
