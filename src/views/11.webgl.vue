<!--
 * @Author: Li Jian
 * @Date: 2022-01-12 19:41:49
 * @LastEditTime: 2022-01-12 21:19:37
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const canvas: canvasType = document.querySelector('#c11')
    const gl: glType = canvas?.getContext('webgl')
    if (!gl) {
      return
    }

    const vsSource = `
      attribute vec2 a_position;
      uniform vec2 u_resolution;
      uniform vec2 u_translation;
      uniform vec2 u_rotation;
      uniform vec2 u_scale;

      void main() {
        // scale
        vec2 scaledPosition = a_position * u_scale;
        // rotate the position
        vec2 rotatedPosition = vec2(
          scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
          scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x
        );
        // translate the position
        vec2 position = rotatedPosition + u_translation;
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / u_resolution;
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
        // convert from 0->2 to -1->1 (clipspace)
        vec2 clipspace = zeroToTwo - 1.0;
        gl_Position = vec4(clipspace * vec2(1, -1), 0, 1);
      }
    `

    const fsSource = `
      precision mediump float;
      uniform vec4 u_color;
      void main() {
        gl_FragColor = u_color;
      }
    `

    const setGeometry = (gl: glType) => {
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

    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const translationLocation = gl.getUniformLocation(program, 'u_translation')
    const rotationLocation = gl.getUniformLocation(program, 'u_rotation')
    const colorLocation = gl.getUniformLocation(program, 'u_color')
    const scaledPosition = gl.getUniformLocation(program, 'u_scale')

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setGeometry(gl)

    const translation = [0, 0]
    const rotation = [0, 1]
    // const rotation = [-0.5, 0.87]
    const scale = [1, 1]
    const color = [Math.random(), Math.random(), Math.random(), 1]

    const drawScene = () => {
      webglUtils.resizeCanvasToDisplaySize(gl.canvas)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      gl.uniform4fv(colorLocation, color)
      gl.uniform2fv(translationLocation, translation)
      gl.uniform2fv(rotationLocation, rotation)
      gl.uniform2fv(scaledPosition, scale)
      gl.drawArrays(gl.TRIANGLES, 0, 18)
    }

    drawScene()

    function updatePosition(index: number) {
      return function (event: any, ui: { value: number }) {
        translation[index] = ui.value
        drawScene()
      }
    }

    function updateScale(index: number) {
      return function (event: any, ui: { value: number }) {
        scale[index] = ui.value
        drawScene()
      }
    }

    function updateAngle(event: any, ui: { value: number }) {
      const angleInDegrees = 360 - ui.value
      const angleInRadians = (angleInDegrees * Math.PI) / 180
      rotation[0] = Math.sin(angleInRadians)
      rotation[1] = Math.cos(angleInRadians)
      drawScene()
    }

    webglLessonsUI.setupSlider('#x', {
      value: translation[0],
      slide: updatePosition(0),
      max: gl.canvas.width,
    })
    webglLessonsUI.setupSlider('#y', {
      value: translation[1],
      slide: updatePosition(1),
      max: gl.canvas.height,
    })
    webglLessonsUI.setupSlider('#scaleX', {
      value: scale[0],
      slide: updateScale(0),
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    })
    webglLessonsUI.setupSlider('#scaleY', {
      value: scale[1],
      slide: updateScale(1),
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    })
    webglLessonsUI.setupSlider('#angle', { slide: updateAngle, max: 360 })
  }
  main()
})
</script>

<template lang="pug">
canvas#c11(style="width: 100%; height: 100%")
#uiContainer
  #ui
    #x
    #y
    #scaleX
    #scaleY
    #angle
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
