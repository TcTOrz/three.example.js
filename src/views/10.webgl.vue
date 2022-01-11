<!--
 * @Author: Li Jian
 * @Date: 2022-01-11 19:39:33
 * @LastEditTime: 2022-01-11 22:23:24
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const canvas: canvasType = document.querySelector('#c10')
    const gl: glType = canvas?.getContext('webgl')
    if (!gl) {
      return
    }

    const vsSource = `
      attribute vec2 a_position;
      uniform vec2 u_resolution;
      uniform vec2 u_translation;
      void main() {
        vec2 position = a_position + u_translation;
        vec2 zeroToOne = position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
    `

    const fsSource = `
      precision mediump float;
      uniform vec4 u_color;
      void main() {
        gl_FragColor = u_color;
      }
    `

    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const translationLocation = gl.getUniformLocation(program, 'u_translation')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const colorLocation = gl.getUniformLocation(program, 'u_color')

    const positionBuffer = gl.createBuffer()
    // 绑定到 ARRAY_BUFFER (简单的理解为 ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const translation = [0, 0]
    const width = 100
    const height = 150 // 30
    const color = [Math.random(), Math.random(), Math.random(), 1]

    const setRectangle = (gl: glType, x: number, y: number, width: number, height: number) => {
      // const x1 = x
      // const x2 = x + width
      // const y1 = y
      // const y2 = y + height

      gl?.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      // const positions = [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]
      // gl?.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

      const thickness = 30
      gl?.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          // 左竖
          x,
          y,
          x + thickness,
          y,
          x,
          y + height,
          x,
          y + height,
          x + thickness,
          y,
          x + thickness,
          y + height,

          // 上横
          x + thickness,
          y,
          x + width,
          y,
          x + thickness,
          y + thickness,
          x + thickness,
          y + thickness,
          x + width,
          y,
          x + width,
          y + thickness,

          // 中横
          x + thickness,
          y + thickness * 2,
          x + (width * 2) / 3,
          y + thickness * 2,
          x + thickness,
          y + thickness * 3,
          x + thickness,
          y + thickness * 3,
          x + (width * 2) / 3,
          y + thickness * 2,
          x + (width * 2) / 3,
          y + thickness * 3,
        ]),
        gl.STATIC_DRAW
      )
    }

    function setGeometry(gl: glType) {
      gl?.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          // left column
          0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,

          // top rung
          30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,

          // middle rung
          30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,
        ]),
        gl.STATIC_DRAW
      )
    }

    const drawScene = () => {
      webglUtils.resizeCanvasToDisplaySize(gl.canvas)
      // 裁剪空间对应到像素
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      // 清空画布
      gl.clear(gl.COLOR_BUFFER_BIT)

      // 使用程序
      gl.useProgram(program)
      // 启用属性
      gl.enableVertexAttribArray(positionLocation)
      // 绑定位置缓冲
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      // 设置矩形参数
      setGeometry(gl)
      // setRectangle(gl, translation[0], translation[1], width, height)
      const size = 2
      const type = gl.FLOAT
      const normalize = false
      const stride = 0
      const offset = 0
      gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset)
      gl.uniform2fv(translationLocation, translation)
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      gl.uniform4fv(colorLocation, color)
      // 绘制
      const primitiveType = gl.TRIANGLES
      const offset1 = 0
      const count = 18 // 6
      gl.drawArrays(primitiveType, offset1, count)
    }

    drawScene()

    function updatePosition(index: number) {
      return function (event: any, ui: { value: number }) {
        translation[index] = ui.value
        drawScene()
      }
    }

    webglLessonsUI.setupSlider('#x', {
      value: translation[0],
      slide: updatePosition(0),
      max: gl.canvas.width - width,
    })
    webglLessonsUI.setupSlider('#y', {
      value: translation[1],
      slide: updatePosition(1),
      max: gl.canvas.height - height,
    })
  }
  main()
})
</script>

<template lang="pug">
canvas#c10(style="width: 100%; height: 100%;")
#uiContainer
  #ui
    #x
    #y
</template>

<style>
#uiContainer {
  position: absolute;
  right: 0;
  top: 0;
}
#ui {
  width: 200px;
}
</style>
