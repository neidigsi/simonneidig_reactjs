import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), tailwindcss(), reactRouter(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },
    define: {
      VITE_APP_BACKEND_ADDRESS: JSON.stringify(env.VITE_APP_BACKEND_ADDRESS),
    },
  };
});
