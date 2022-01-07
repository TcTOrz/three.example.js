<!--
 * @Author: Li Jian
 * @Date: 2022-01-06 08:53:39
 * @LastEditTime: 2022-01-06 10:36:51
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  main()

  function main() {
    const canvas: HTMLCanvasElement | null = document.querySelector('#c2')
    const gl = canvas?.getContext('webgl')

    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
      return
    }

    // 顶点着色器程序 glsl
    const vsSource = `
      // 从缓冲区中读取顶点数据
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `

    // 片段着色器程序 glsl
    const fsSource = `
      // 中等精度
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
      }
    `

    // 创建着色器方法，输入参数为 渲染器上下文，着色器类型，数据源
    function createShader(gl, type, source) {
      const shader = gl.createShader(type) // 创建着色器
      gl.shaderSource(shader, source) // 将着色器源码附加到着色器对象上
      gl.compileShader(shader) // 编译着色器
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS) // 获取编译状态
      if (!success) {
        // 获取编译错误信息
        console.log(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)

    // 将两个着色器链接到一个着色器程序
    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram() // 创建着色器程序
      gl.attachShader(program, vertexShader) // 将顶点着色器附加到着色器程序上
      gl.attachShader(program, fragmentShader) // 将片段着色器附加到着色器程序上
      gl.linkProgram(program) // 链接着色器程序
      const success = gl.getProgramParameter(program, gl.LINK_STATUS) // 获取链接状态
      if (!success) {
        console.log(gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null
      }
      return program
    }

    const program = createProgram(gl, vertexShader, fragmentShader)

    // 找到唯一输入变量 a_position
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

    const positionBuffer = gl.createBuffer() // 创建缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer) // 绑定缓冲区对象

    // const positions = [0, 0, 0, 0.5, 0.7, 0] // 创建顶点数据
    const positions = [0, 0, 0, 0.5, 0.7, 0]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW) // 将数据写入缓冲区

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program) // 使用着色器程序

    gl.enableVertexAttribArray(positionAttributeLocation) // 启用顶点属性数组

    const size = 2 // 每个顶点属性的组件数量
    const type = gl.FLOAT // 每个顶点属性的数据类型
    const normalize = false // 不需要归一化数据
    const stride = 0 // 0 = 移动距离 * size
    const offset = 0 // 从第offset个位置开始读取
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset) // 配置顶点属性指针

    const primitiveType = gl.TRIANGLES // 绘制图元类型
    const count = 3 // 绘制的个数
    gl.drawArrays(primitiveType, 0, count) // 绘制
  }
})
</script>

<template lang="pug">
canvas#c2(width="400", height="400", style="width: 400; height: 400;")
</template>
