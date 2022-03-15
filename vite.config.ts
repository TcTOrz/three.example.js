/*
 * @Author: Li Jian
 * @Date: 2022-01-05 08:50:19
 * @LastEditTime: 2022-03-15 10:57:45
 * @LastEditors: Li Jian
 */
import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dependencies } from './package.json'
import { svgBuilder } from './scripts/svgBuilder'
import { viteMockServe } from 'vite-plugin-mock'

const chunks = ['d3', 'lodash', 'echarts', 'vue']
const elementplus = ['element-plus']
// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
  // 根据项目配置。可以配置在.env文件
  let prodMock = true
  return {
    plugins: [
      vue(),
      svgBuilder('./src/icons/svg/'),
      viteMockServe({
        mockPath: 'src/mock',
        watchFiles: true,
        supportTs: true,
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
    ],
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
        '@axios': '/src/axios',
        '@echarts': '/src/echarts',
      },
    },
    base: process.env.NODE_ENV === 'production' ? '/dist/' : '',
    assetsInclude: ['**/*.gltf'],
    build: {
      emptyOutDir: true,
      // sourcemap: 'hidden',
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
  }
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
