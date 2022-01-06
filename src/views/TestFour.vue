<!--
 * @Author: Li Jian
 * @Date: 2022-01-06 10:39:45
 * @LastEditTime: 2022-01-06 14:03:04
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const canvas: HTMLCanvasElement | null = document.querySelector('#c3')
    const gl = canvas?.getContext('webgl')
    if (!gl) {
      alert('WebGL not supported')
      return
    }

    const program = webglUtils.createProgramFromSources(gl, [
      `
      attribute vec4 a_position;
      uniform vec2 u_resolution;
      void main() {
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position.xy / u_resolution;
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;
        // gl_Position = vec4(clipSpace, 0, 1);
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
      `,
      `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
      }
      `,
    ])

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.enableVertexAttribArray(positionAttributeLocation)

    var size = 2 // 2 components per iteration
    var type = gl.FLOAT // the data is 32bit floats
    var normalize = false // don't normalize the data
    var stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0 // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    // draw
    var primitiveType = gl.TRIANGLES
    var offset = 0
    var count = 6
    gl.drawArrays(primitiveType, offset, count)
  }
  main()
})
</script>

<template lang="pug">
canvas#c3(width="400", height="400", style="width: 400px; height: 400px;")
</template>
