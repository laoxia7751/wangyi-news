import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "/@": path.resolve(path.dirname(""), "./src"),
      "/@com": path.resolve(path.dirname(""), "./src/components"),
      "/@api": path.resolve(path.dirname(""), "./src/api"),
      "@server": path.resolve(path.dirname(""), "./server"),
    },
  },
  server: {
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: "https://v1.alapi.cn/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/sys-api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sys-api/, ""),
      },
    },
  },
});
