/*
 * @Author: Li Jian
 * @Date: 2022-01-04 20:31:21
 * @LastEditTime: 2022-01-18 19:21:52
 * @LastEditors: Li Jian
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'three.meshline'

declare module 'd3'

// 全局变量
declare var webglUtils: any
declare var webglLessonsUI: any

declare type canvasType = HTMLCanvasElement | null
declare type glType = WebGLRenderingContext | undefined | null
