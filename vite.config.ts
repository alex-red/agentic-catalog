import { execSync } from "node:child_process";
import { defineConfig } from "vite";

// Bulk install scripts fetch files at the commit the site was built from, so a config always names real content.
function revision(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "main";
  }
}

export default defineConfig({
  root: "site",
  // Served from https://alex-red.github.io/agentic-catalog/ on GitHub Pages.
  base: "/agentic-catalog/",
  define: { __CATALOG_REVISION__: JSON.stringify(revision()) },
  server: {
    host: "127.0.0.1",
    // The page imports ../catalog/index.json from the repo root.
    fs: { allow: [".."] },
  },
  build: { outDir: "../dist/site", emptyOutDir: true },
});
