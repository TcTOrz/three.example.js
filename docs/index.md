<!--
 * @Author: Li Jian
 * @Date: 2022-04-27 09:54:19
 * @LastEditTime: 2022-04-27 14:36:49
 * @LastEditors: Li Jian
-->

# 电力通信数字化平台交接文档

> 建议使用 Markdown 预览本文档

### 项目总体架构

- 本项目为一个基于 Vue3(TS) + ThreeJs 的电力通信数字化平台项目。
- UI 框架: Element-plus
- 打包工具: Vite (生产环境: Rollup; 开发环境: Esbuild)
- 状态管理: Pinia
- 路由: Vue-router
- 其他插件: PugJs、Scss、Echarts、D3、AnimateCss、TweenJs、Lodash 等

### 项目目前进展(UI)

- [x] 框架结构
  - [x] 导航栏
  - [x] 搜索栏
  - [x] 导航菜单
- [x] 首页页面
  - [x] 3D 场景
  - [x] 两侧图表
  - [x] 其他按钮
- [ ] 站点页面
  - [x] 3D 场景
  - [ ] 两侧 UI
- [ ] 光缆页面
  - [x] 3D 场景
  - [ ] 两侧 UI

> 具体代码含义: 见开发中代码注释。

### 文件夹具体含义说明

| 文件夹路径                                  | 文件夹用途                                                 |
| :------------------------------------------ | :--------------------------------------------------------- |
| [src/](../src/)                             | 源代码目录                                                 |
| [src/assets/](../src/assets/)               | 图片、地图等资源目录                                       |
| [src/axios/](../src/axios/)                 | axios 请求及封装目录                                       |
| [src/components/](../src/components/)       | 组件目录: _svg_                                            |
| [src/echarts/](../src/echarts/)             | echarts 封装目录                                           |
| [src/element-plus/](../src/element-plus/)   | Element-plus 组件目录                                      |
| [src/icons/](../src/icons/)                 | _svg_ 图标目录                                             |
| [src/loading/](../src/loading/)             | loading 目录 (**暂未使用**)                                |
| [src/mock/](../src/mock/)                   | mock 请求目录                                              |
| [src/router/](../src/router/)               | 路由目录                                                   |
| [src/shared/](../src/shared/)               | 公共组件目录(**主要针对 3D 模型的公共组件**)               |
| [src/shared/fiber/](../src/shared/fiber/)   | 光缆 3D 模型                                               |
| [src/shared/map/](../src/shared/map/)       | 地图 3D 模型                                               |
| [src/shared/radar/](../src/shared/radar/)   | 雷达 3D 模型                                               |
| [src/shared/site/](../src/shared/site/)     | 站点 3D 模型                                               |
| [src/store/](../src/store/)                 | 状态管理目录                                               |
| [src/tippy/](../src/tippy/)                 | Popper 目录                                                |
| [src/views/](../src/views/)                 | 视图目录                                                   |
| [src/views/fiber/](../src/views/fiber/)     | 光缆视图                                                   |
| [src/views/map/](../src/views/map/)         | 首页视图                                                   |
| [src/views/site/](../src/views/site/)       | 站点视图                                                   |
| [src/views/useless/](../src/views/useless/) | 早期尝试的一些代码，**学习研究** 用                        |
| [public/blender/](../public/blender/)       | Blender 模型存储位置                                       |
| [scripts/](../scripts/)                     | 脚本目录，在 **package.json** 和 **vite.config.js** 中使用 |

### 打包操作

请按照 **package.json** 中 _engines_ 属性中指定的 _node_ 版本运行。

- 生产模式:
  ```bash
  npm run build
  ```
- 开发模式:
  ```bash
  npm run dev
  ```

### 其他

- 本项目 3D 渲染流程一般如下：

  ```mermaid
  graph LR
    1[开始] --> 2(创建渲染器) --> 3(初始化场景) --> 4(初始化背景) --> 5(初始化相机) --> 6(初始化灯光) --> 7(初始化控制器) --> 8(加载模型) --> 9(编写模型事件) --> 10(RAF渲染) -.自循环.-> 10
  ```

- 笔记本若有独显，可以配置浏览器开启独显的模式，提升开发体验。

- 使用 PugJs 模板引擎时，当使用 include 指令时，请注意可能无法触发 HMR。

- 使用 TS 时，如果报错类似找不到类型定义，请检查是否已经安装了相应的依赖或者是否在 env.d.ts 文件中声明了全局变量。

- 类似首页中 radar 的效果或者扫图的效果，可以使用 Shader(着色器) 语言实现。

- 本项目借助 husky、git、commitlint 等工具对前端提交代码进行规范，以及框架的自动化构建。后期不需要，可删除对应文件以及依赖即可。
