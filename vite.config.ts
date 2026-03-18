import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    hmr: { port: 24679 },
  },

  build: {
    outDir: "dist/client", // 🔥 FIX: correct output folder
    emptyOutDir: true, // 🔥 clean previous builds

    // optional but recommended
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
});
