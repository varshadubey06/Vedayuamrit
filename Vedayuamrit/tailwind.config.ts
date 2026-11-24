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
        ayur: {
          deep: "#081C11",
          forest: "#113824",
          emerald: "#165B37",
          leaf: "#227B48",
          mint: "#E8F5E9",
          cream: "#FAF8F5",
          sand: "#F4ECE1",
          gold: "#C59B27",
          goldLight: "#F5DF9E",
          goldDark: "#9A7416",
          goldBright: "#E6B83B",
          earth: "#7D4E2D",
          terracotta: "#B85D35",
          charcoal: "#1F2623",
          stone: "#5E6C64",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        serif: ["Poppins", "Cinzel", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        ayur: "0 10px 30px -10px rgba(17, 56, 36, 0.18)",
        gold: "0 8px 25px -4px rgba(197, 155, 39, 0.35)",
        luxury: "0 20px 40px -15px rgba(8, 28, 17, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
