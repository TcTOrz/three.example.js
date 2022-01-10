/*
 * @Author: Li Jian
 * @Date: 2022-01-04 20:31:21
 * @LastEditTime: 2022-01-10 19:41:29
 * @LastEditors: Li Jian
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 全局变量
declare var webglUtils: any

declare type canvasType = HTMLCanvasElement | null
declare type glType = WebGLRenderingContext | undefined | null
