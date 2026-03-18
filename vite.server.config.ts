import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@mui/styled-engine": path.resolve(
        __dirname,
        "node_modules/@emotion/styled",
      ),
    },
  },

  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist/server-entry",
    target: "node22", // compatible with Node 22
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js",
      },
    },
  },

  ssr: {
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
