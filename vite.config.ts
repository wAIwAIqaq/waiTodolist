import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

import path from "path";

import VueDevTools from 'vite-plugin-vue-devtools'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: "./",
    mode: env.APP_ENV,
    server: {
      open: false,
      host: "0.0.0.0",
      port: 5050,
      strictPort: true,
    },
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        utils: path.resolve(__dirname, "./src/utils"),
        components: path.resolve(__dirname, "./src/components"),
        api: path.resolve(__dirname, "./src/api"),
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },

    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  };
});
