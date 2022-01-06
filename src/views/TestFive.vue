<!--
 * @Author: Li Jian
 * @Date: 2022-01-06 14:09:33
 * @LastEditTime: 2022-01-06 15:02:28
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function randomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  function setRectangle(
    gl: WebGLRenderingContext,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const x1 = x
    const x2 = x + width
    const y1 = y
    const y2 = y + height
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      gl.STATIC_DRAW
    )
  }
  function main() {
    const canvas: HTMLCanvasElement | null = document.querySelector('#c4')
    const gl = canvas?.getContext('webgl')
    if (!gl) {
      alert('WebGL not supported')
      return
    }

    // 顶点着色器代码
    const vsSource = `
      attribute vec4 a_position;
      uniform vec2 u_resolution;
      void main() {
        vec2 zeroToOne = a_position.xy / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
    `

    const fsSource = `
      precision mediump float;
      // 自定义颜色
      uniform vec4 u_color;
      void main() {
        // gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
        gl_FragColor = u_color;
      }
    `

    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    // const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30]
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.enableVertexAttribArray(positionAttributeLocation)
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    for (let i = 0; i < 50; ++i) {
      setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300))
      gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1)
      const primitiveType = gl.TRIANGLES
      const offset = 0
      const count = 6
      gl.drawArrays(primitiveType, offset, count)
    }

    // gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
  main()
})
</script>

<template lang="pug">
canvas#c4(height="400", width="400", style="width: 400px; height: 400px;")
</template>
