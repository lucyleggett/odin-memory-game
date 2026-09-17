import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api-sanrio": {
          target:
            "https://api.parse.bot/scraper/671b3e36-0d6a-4074-8c11-d9bcd991c3fd/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-sanrio/, ""),
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader("X-API-Key", env.VITE_PARSE_API_KEY);
              proxyReq.setHeader("Content-Type", "application/json");
            });
          },
        },
      },
    },
  };
});
