<!--
 * @Author: Li Jian
 * @Date: 2022-01-13 19:20:10
 * @LastEditTime: 2022-01-13 21:59:32
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const canvas: canvasType = document.querySelector('#c12')
    const gl: glType = canvas?.getContext('webgl')
    if (!gl) {
      return
    }

    const vsSource = `
      attribute vec2 a_position;

      uniform vec2 u_resolution;
      uniform mat3 u_matrix;
      void main() {
        // 反过来肯定就不行了 具体参照http://www2.edu-edu.com.cn/lesson_crs78/self/j_0022/soft/ch0605.html 结论1
        // vec2 position = (vec3(a_position, 1) * u_matrix).xy;
        vec2 position = (u_matrix * vec3(a_position, 1)).xy;

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

    const m3 = {
      translation: function (tx: number, ty: number) {
        // prettier-ignore
        return [
          1, 0, 0,
          0, 1, 0,
          tx, ty, 1
        ]
      },
      rotation: function (angleInRadians: number) {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        // prettier-ignore
        return [
          c, -s, 0,
          s, c, 0,
          0, 0, 1
        ]
      },
      scaling: function (sx: number, sy: number) {
        // prettier-ignore
        return [
          sx, 0, 0,
          0, sy, 0,
          0, 0, 1
        ]
      },
      multiply: function (a: any[], b: any[]) {
        var a00 = a[0 * 3 + 0]
        var a01 = a[0 * 3 + 1]
        var a02 = a[0 * 3 + 2]
        var a10 = a[1 * 3 + 0]
        var a11 = a[1 * 3 + 1]
        var a12 = a[1 * 3 + 2]
        var a20 = a[2 * 3 + 0]
        var a21 = a[2 * 3 + 1]
        var a22 = a[2 * 3 + 2]
        var b00 = b[0 * 3 + 0]
        var b01 = b[0 * 3 + 1]
        var b02 = b[0 * 3 + 2]
        var b10 = b[1 * 3 + 0]
        var b11 = b[1 * 3 + 1]
        var b12 = b[1 * 3 + 2]
        var b20 = b[2 * 3 + 0]
        var b21 = b[2 * 3 + 1]
        var b22 = b[2 * 3 + 2]
        return [
          b00 * a00 + b01 * a10 + b02 * a20,
          b00 * a01 + b01 * a11 + b02 * a21,
          b00 * a02 + b01 * a12 + b02 * a22,
          b10 * a00 + b11 * a10 + b12 * a20,
          b10 * a01 + b11 * a11 + b12 * a21,
          b10 * a02 + b11 * a12 + b12 * a22,
          b20 * a00 + b21 * a10 + b22 * a20,
          b20 * a01 + b21 * a11 + b22 * a21,
          b20 * a02 + b21 * a12 + b22 * a22,
        ]
      },
    }

    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
    const colorLocation = gl.getUniformLocation(program, 'u_color')

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

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

    setGeometry(gl)

    let translation = [100, 150]
    let angleInRadians = 0
    let scale = [1, 1.5]
    const color = [Math.random(), Math.random(), Math.random(), 1]

    // Setup a ui.
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
    webglLessonsUI.setupSlider('#angle', { slide: updateAngle, max: 360 })
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

    function updatePosition(index: number) {
      return function (event: any, ui: { value: number }) {
        translation[index] = ui.value
        drawScene()
      }
    }

    function updateAngle(event: any, ui: { value: number }) {
      const angleInDegrees = 360 - ui.value
      angleInRadians = (angleInDegrees * Math.PI) / 180
      drawScene()
    }

    function updateScale(index: number) {
      return function (event: any, ui: { value: number }) {
        scale[index] = ui.value
        drawScene()
      }
    }

    function drawScene() {
      webglUtils.resizeCanvasToDisplaySize(gl?.canvas)
      gl?.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl?.clear(gl.COLOR_BUFFER_BIT)
      gl?.useProgram(program)

      gl?.enableVertexAttribArray(positionLocation)
      gl?.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl?.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl?.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      gl?.uniform4fv(colorLocation, color)

      const translationMatrix = m3.translation(translation[0], translation[1])
      const rotationMatrix = m3.rotation(angleInRadians)
      const scaleMatrix = m3.scaling(scale[0], scale[1])

      let matrix = m3.multiply(translationMatrix, rotationMatrix)
      matrix = m3.multiply(matrix, scaleMatrix)

      gl?.uniformMatrix3fv(matrixLocation, false, matrix)
      gl?.drawArrays(gl.TRIANGLES, 0, 18)
    }

    drawScene()
  }

  main()
})
</script>

<template lang="pug">
canvas#c12(style="width: 100%; height: 100%")
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
