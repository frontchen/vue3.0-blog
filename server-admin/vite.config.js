import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import styleImport from "vite-plugin-style-import";
// https://vitejs.dev/config/'
export default ({ mode }) => {
  const option = loadEnv(mode, process.cwd());
  return defineConfig({
    base: option.VITE_BASE_URL,
    mode: option.VITE_ENV,
    define:JSON.stringify(option),
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        "/@": path.resolve(__dirname, "./src"),
        // '/@components/': path.resolve(__dirname, './src/components')
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' //解决警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
      },
    },
    css: {
      // 引用全局 scss
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/style/index.scss";',
        },
      },
      postcss: "./postcss.config.js",
    },
    server: {
      strictPort: true,
      port: option.VITE_APP_PORT,
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
    },

    build: {
      // 压缩
      minify: "esbuild",
      outDir: "dist",
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      vue(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: name => {
              name = name.slice(3);
              return `element-plus/packages/theme-chalk/src/${name}.scss`;
            },
            resolveComponent: name => {
              return `element-plus/lib/${name}`;
            },
          },
        ],
      }),
    ],
    // 反向代理
    // proxy: {
    //   "/api": {
    //     target: "https://blog.csdn.net/weixin_45292658",
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ""),
    //   },
    // },
  });
};
