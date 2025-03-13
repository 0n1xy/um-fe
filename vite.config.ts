import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Bind to all interfaces
    port: 5173,
  },
  preview: {
    host: "0.0.0.0", // Important for npm run preview
    port: 5173,
  },
});
