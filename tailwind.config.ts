import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#F0F8FF",
          DEFAULT: "#FFFFFF",
          dark: "#E5E5E5",
        },
        "dark-background": {
          light: "#272e3f",
          DEFAULT: "#0f172a",
          dark: "#0e1526",
        },
        primary: {
          light: "#7bc1ff",
          DEFAULT: "#5ab2ff",
          dark: "#488ecc",
        },

        header: "#202c3d",
        "dark-header": "#f5f5f5",
        paragraph: "#4a4a4a",
        "dark-paragraph": "#c0c0c0",
        secondary: "#a5a5a5",
        "dark-secondary": "#a0a0a0",

        "text-accent": {
          light: "#e0417a",
          DEFAULT: "#d81159",
          dark: "#ad0e47",
        },
        accent: {
          light: "#ffa575",
          DEFAULT: "#FF9B66",
          dark: "#CC8053",
        },
      },

      fontFamily: {
        pacifico: ["Pacifico", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
export default config;
