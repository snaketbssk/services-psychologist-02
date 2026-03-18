import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  build: {
    ssr: "src/entry-server.tsx", // 🔥 entry point for SSR
    outDir: "dist/server-entry", // 🔥 must match your server.ts
    target: "node18",

    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js", // 🔥 guarantees filename
      },
    },
  },
});
