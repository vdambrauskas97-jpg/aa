import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" is required so the built assets load over Electron's file:// protocol.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
