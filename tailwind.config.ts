import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"]
      },
      colors: {
        kama: {
          red: "#FE064D",
          magenta: "#FD2479",
          pink: "#FD2479",
          ink: "#050407",
          panel: "#100D12",
          line: "#38202A"
        }
      },
      boxShadow: {
        glow: "0 0 80px rgba(253, 36, 121, 0.26)"
      }
    }
  },
  plugins: []
} satisfies Config;
