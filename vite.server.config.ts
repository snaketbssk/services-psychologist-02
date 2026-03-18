import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist/server-entry",
    target: "node20", // safer with Node 22

    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js",
      },
    },
  },

  // 🔥 THIS FIXES YOUR ERROR
  ssr: {
    noExternal: [
      "@mui/material",
      "@mui/system",
      "@mui/utils",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
});
