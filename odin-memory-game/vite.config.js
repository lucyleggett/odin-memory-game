import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/sanrio-assets": {
          target: "https://sanrio.co.jp",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sanrio-assets/, ""),
        },
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
        "/sanrio-img": {
          target: "https://shop.sanrio.co.jp",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/sanrio-img/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("Referer", "https://shop.sanrio.co.jp/");
              proxyReq.setHeader("Origin", "https://shop.sanrio.co.jp");
              proxyReq.setHeader("Host", "shop.sanrio.co.jp");
              proxyReq.setHeader(
                "User-Agent",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              );
            });
          },
        },
      },
    },
  };
});
