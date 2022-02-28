/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-02-28 10:58:55
 * @LastEditors: Li Jian
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@views': '/src/views',
      '@assets': '/src/assets',
      '@router': '/src/router',
      '@store': '/src/store',
      '@utils': '/src/utils',
      '@shared': '/src/shared',
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/dist/' : '',
  // assetsInclude: ["**/*.gltf", "**/*.bin", "**/*.fbx", "**/*.obj", "**/*.mtl"],
  build: {
    emptyOutDir: true,
  },
})
