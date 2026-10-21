import { defineConfig } from "vite";

export default defineConfig({
  root: "site",
  // Served from https://alex-red.github.io/agentic-catalog/ on GitHub Pages.
  base: "/agentic-catalog/",
  server: {
    host: "127.0.0.1",
    // The page imports ../catalog/index.json from the repo root.
    fs: { allow: [".."] },
  },
  build: { outDir: "../dist/site", emptyOutDir: true },
});
