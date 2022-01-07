/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-01-07 10:50:39
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
})
