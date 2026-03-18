import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@mui/styled-engine": path.resolve(
        __dirname,
        "node_modules/@emotion/styled",
      ),
    },
  },

  server: {
    hmr: { port: 24679 },
  },

  build: {
    outDir: "dist/client", // must match server.ts
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
});
