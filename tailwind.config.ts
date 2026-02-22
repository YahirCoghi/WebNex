import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/messages/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060A14",
          900: "#0A0F1E",
          800: "#0F1729",
          700: "#162038",
          600: "#1E2D4F",
        },
        brand: {
          blue: "#1B3A8C",
          mid: "#2854C5",
          accent: "#3B82F6",
          silver: "#8A9AB8",
          light: "#B8C4D8",
          white: "#EEF2FA",
          green: "#34D399",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        nav: "0 10px 30px rgba(4, 10, 28, 0.45)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": {transform: "scale(1)", opacity: "0.92"},
          "50%": {transform: "scale(1.07)", opacity: "1"},
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
