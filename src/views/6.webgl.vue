<!--
 * @Author: Li Jian
 * @Date: 2022-01-06 15:50:59
 * @LastEditTime: 2022-01-06 19:37:06
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const canvas: HTMLCanvasElement | null = document.querySelector('#c6')
    const gl = canvas?.getContext('webgl')
    if (!gl) {
      alert('WebGL not supported')
      return
    }

    // 顶点着色器代码
    const vsSource = `
      attribute vec4 a_position;
      // varying vec4 v_color;
      attribute vec4 a_color;
      varying vec4 v_color;
      void main() {
        gl_Position = a_position;
        // v_color = gl_Position * 0.5 + 0.5;
        v_color = a_color;
      }
    `

    // 片段着色器代码
    const fsSource = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        // gl_FragColor = vec4(1, 0, 0, 1);
        gl_FragColor = v_color;
      }
    `

    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])

    // 获取attribute变量的存储位置
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color')

    const positionBuffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    // setGeometry(gl)
    function setGeometry(gl) {
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0]),
        gl.STATIC_DRAW
      )
    }

    const colorBuffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    // setColors(gl)
    function setColors(gl) {
      const r1 = Math.random()
      const g1 = Math.random()
      const b1 = Math.random()
      const r2 = Math.random()
      const g2 = Math.random()
      const b2 = Math.random()
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          Math.random(),
          Math.random(),
          Math.random(),
          1,
          Math.random(),
          Math.random(),
          Math.random(),
          1,
          Math.random(),
          Math.random(),
          Math.random(),
          1,
          Math.random(),
          Math.random(),
          Math.random(),
          1,
          Math.random(),
          Math.random(),
          Math.random(),
          1,
          Math.random(),
          Math.random(),
          Math.random(),
          1,
        ]),
        // new Float32Array([
        //   r1,
        //   g1,
        //   b1,
        //   1,
        //   r1,
        //   b1,
        //   g1,
        //   1,
        //   r1,
        //   b1,
        //   g1,
        //   1,
        //   r2,
        //   g2,
        //   b2,
        //   1,
        //   r2,
        //   g2,
        //   b2,
        //   1,
        //   r2,
        //   g2,
        //   b2,
        //   1,
        // ]),
        gl.STATIC_DRAW
      )
    }

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    // gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)

    // 这个命令是告诉WebGL我们想从缓冲中提供数据。
    gl.enableVertexAttribArray(positionAttributeLocation)
    // 这个命令是将缓冲绑定到 ARRAY_BUFFER 绑定点，它是WebGL内部的一个全局变量。
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    // 这个命令告诉WebGL从 ARRAY_BUFFER 绑定点当前绑定的缓冲获取数据。
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    setGeometry(gl)

    gl.enableVertexAttribArray(colorAttributeLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0)
    setColors(gl)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  main()
})
</script>

<template lang="pug">
canvas#c6(width="400", height="400", style="width: 400px; height: 400px;")
</template>
