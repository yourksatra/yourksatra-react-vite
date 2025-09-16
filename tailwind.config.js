// tailwind.config.js
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInDown: "fadeInDown 0.3s ease-out",
        slideUp: "slideUp 0.7s ease-out forwards",
        slideDown: "slideDown 0.7s ease-out forwards",
      },
      colors: {
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
})
