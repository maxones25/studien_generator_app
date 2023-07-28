import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@modules": "/src/modules",
      "@pages": "/src/pages",
    },
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
});
