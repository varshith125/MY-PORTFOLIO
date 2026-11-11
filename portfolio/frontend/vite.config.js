import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// In development, /api requests are forwarded to the Express backend.
// Change the port with VITE_DEV_API in .env if your server is not on 5000.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_DEV_API || "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
  };
});
