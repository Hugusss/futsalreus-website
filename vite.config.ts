import { copyFileSync } from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// Branch previews (wrangler preview) answer 404 for a path without a file, so reloading or
// sharing a deep link fails there. Each route gets its own copy of index.html, served at /route.
// Production keeps the single-page fallback for anything not listed; keep this in step with the router.
const ROUTES = ["metodologia", "competicions", "activitats", "inscripcio", "botiga"];

function routePages(): Plugin {
  let outDir = "";
  return {
    name: "route-pages",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      for (const route of ROUTES) {
        copyFileSync(path.join(outDir, "index.html"), path.join(outDir, `${route}.html`));
      }
    },
  };
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), routePages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
