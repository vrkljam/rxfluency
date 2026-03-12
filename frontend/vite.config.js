import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/static/" : "/", // <-- "/" for dev, "/static/" for production
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    proxy:
      mode === "development"
        ? {
            "/api": {
              target: "http://127.0.0.1:8000",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
  },
}));

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vite.dev/config/
// export default defineConfig({
//   base: "/static/", // <-- ensures all assets are served under Django's STATIC_URL
//   plugins: [react()],
//   build: {
//     outDir: "dist", // build folder
//     assetsDir: "assets", // your current folder structure matches this
//   },
// });
