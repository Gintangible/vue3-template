import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from "vite-plugin-eslint";
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/variable.less";`
      },
    },
  },
});
