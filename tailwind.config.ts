import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        fitness: {
          50: "#ecfdf5",
          500: "#10b981",
          600: "#059669"
        },
        therapy: {
          50: "#eef2ff",
          500: "#6366f1",
          600: "#4f46e5"
        },
        education: {
          50: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706"
        }
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.95)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" }
        }
      },
      animation: {
        "pulse-slow": "pulse-slow 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
