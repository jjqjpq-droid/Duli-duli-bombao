import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        muted: "#f1f5f9",
        "muted-foreground": "#6b7280",
        border: "#e2e8f0",
        primary: "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-0.5rem)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
