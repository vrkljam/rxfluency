import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/static/", // <-- ensures all assets are served under Django's STATIC_URL
  plugins: [react()],
  build: {
    outDir: "dist", // build folder
    assetsDir: "assets", // your current folder structure matches this
  },
});
