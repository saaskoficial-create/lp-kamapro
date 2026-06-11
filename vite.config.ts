import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/lp/",
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    sourcemap: false
  }
});
