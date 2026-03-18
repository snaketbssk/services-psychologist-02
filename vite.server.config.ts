import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist/server-entry",
    target: "node18",
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js",
      },
    },
  },

  ssr: {
    // 🔥 Bundle all MUI + icons for SSR
    noExternal: [
      "@mui/material",
      "@mui/system",
      "@mui/utils",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
    ],
  },
});
