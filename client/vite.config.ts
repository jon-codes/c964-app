import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    port: 8080,
    strictPort: true,
  },
  root: __dirname,
});
