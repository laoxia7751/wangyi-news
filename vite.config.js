import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  alias: {
    "/@": resolve(__dirname, "./src"),
    "/@com": resolve(__dirname, "./src/components"),
    "/@api": resolve(__dirname, "./src/api"),
  },
  open: true,
});
