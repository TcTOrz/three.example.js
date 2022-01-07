<!--
 * @Author: Li Jian
 * @Date: 2022-01-06 15:06:56
 * @LastEditTime: 2022-01-06 15:40:29
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const canvas: HTMLCanvasElement | null = document.querySelector('#c5')
    const gl = canvas?.getContext('webgl')
    if (!gl) {
      alert('WebGL not supported')
      return
    }

    // 顶点着色器代码
    const vsSource = `
      attribute vec4 a_position;
      uniform vec2 u_resolution;
      varying vec4 v_color;
      void main() {
        vec2 zeroToOne = a_position.xy / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        // gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        gl_Position = vec4(clipSpace , 0, 1);
        // 从裁减空间转换到颜色空间
        // 裁减空间范围 -1.0 到 +1.0
        // 颜色空间范围 0.0 到 1.0
        v_color = gl_Position * 0.5 + 0.5;
      }
    `

    // 片段着色器代码
    const fsSource = `
      precision mediump float;
      // 在片断着色器中定义同名varying变量
      varying vec4 v_color;
      // 自定义颜色
      uniform vec4 u_color;
      void main() {
        // gl_FragColor = u_color;
        gl_FragColor = v_color;
      }
    `

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

    // 创建缓冲区对象
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.useProgram(program)
    // 启用顶点数组
    gl.enableVertexAttribArray(positionAttributeLocation)
    // 告诉显卡从当前绑定的缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据。
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([100, 100, 100, 300, 300, 100]), gl.STATIC_DRAW)
    gl.uniform4f(colorUniformLocation, 1, 0, 0, 1)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  main()
})
</script>

<template lang="pug">
canvas#c5(width="400", height="400", style="width: 400px; height: 400px;")
</template>
