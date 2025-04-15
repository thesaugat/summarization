import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",      // ← this exposes the dev server to your host machine
    port: 5173,           // ← or change to 3000 if you prefer
    watch: {
      usePolling: true,   // ← important for Docker on macOS/Windows
    },
  },
});