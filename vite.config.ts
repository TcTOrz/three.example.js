/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-03-08 16:03:07
 * @LastEditors: Li Jian
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dependencies } from './package.json'
import { svgBuilder } from './scripts/svgBuilder'

const chunks = ['d3', 'lodash', 'echarts', 'vue']
const elementplus = ['element-plus']
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/icons/svg/')],
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
  assetsInclude: ['**/*.gltf'],
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
