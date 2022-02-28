/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-02-28 13:56:19
 * @LastEditors: Li Jian
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dependencies } from './package.json'

const chunks = ['d3', 'lodash', 'echarts', 'vue']
const elementplus = ['element-plus']
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
    rollupOptions: {
      output: {
        manualChunks: {
          chunks,
          elementplus,
          ...renderChunks(dependencies),
        },
      },
    },
  },
})
function renderChunks(dependencies: Object) {
  const obj = {}
  Object.keys(dependencies).forEach(key => {
    if (!chunks.includes(key) && !elementplus.includes(key)) {
      obj[key] = [key]
    }
  })
  return obj
}
