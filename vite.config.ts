import { defineConfig } from "vite";

export default defineConfig({
  root: "site",
  server: {
    host: "127.0.0.1",
    // The page imports ../catalog/index.json from the repo root.
    fs: { allow: [".."] },
  },
  build: { outDir: "../dist/site", emptyOutDir: true },
});
