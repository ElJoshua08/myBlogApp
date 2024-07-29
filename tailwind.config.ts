import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    animation: {
      skeleton: "skeleton 1s infinite",
    },

    keyframes: {
      skeleton: {
        "0%, 100%": { brightness: "2" },
        "50%": { brightness: "0.5" },
      },
    },

    extend: {
      colors: {
        primary: {
          light: "#CAF4FF",
          DEFAULT: "#A0DEFF",
          dark: "#5AB2FF",
        },
        accent: {
          DEFAULT: "#FF9B66",
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
