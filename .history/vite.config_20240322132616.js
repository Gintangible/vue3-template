import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://blog.csdn.net/csdn9_14/article/details/135124871
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// 项目启动或打包时调用eslint
import eslintPlugin from "vite-plugin-eslint";
import postCssPxToRem from 'postcss-pxtorem';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    eslintPlugin(),
  ],
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
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*'],
        })
      ]
    },
  },
});
