<!--
 * @Author: Li Jian
 * @Date: 2022-01-10 19:32:32
 * @LastEditTime: 2022-01-11 19:33:43
 * @LastEditors: Li Jian
-->
<script setup lang="ts">
import { onMounted } from 'vue-demi'

onMounted(() => {
  function main() {
    const image = new Image()
    image.src = './1.jpg'
    image.onload = function () {
      render(image)
    }
  }

  function render(image: HTMLImageElement) {
    const canvas: canvasType = document.querySelector('#c9')
    const gl: glType = canvas?.getContext('webgl')
    if (!gl) {
      alert('WebGL not supported')
      return
    }

    const vsSource = `
      attribute vec4 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position * vec4(1, -1, 0, 1));
        // 将纹理坐标传递给片段着色器
        // GPU会根据纹理坐标计算出颜色
        v_texCoord = a_texCoord;
      }
    `

    const fsSource = `
      precision mediump float;

      // 纹理
      uniform sampler2D u_image;
      uniform vec2 u_textureSize;
      // 纹理坐标
      varying vec2 v_texCoord;
      void main() {
        // 计算1像素对应的纹理坐标
        vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
        // 对左中右三个像素进行模糊，求平均值
        gl_FragColor = (
          texture2D(u_image, v_texCoord) +
          texture2D(u_image, v_texCoord + vec2(onePixel.x, 0.0)) +
          texture2D(u_image, v_texCoord + vec2(-onePixel.x, 0.0))
        ) / 3.0;

        // gl_FragColor = vec4(1, 0, 0, 1);
        // gl_FragColor = texture2D(u_image, v_texCoord).rgba; // 红色和绿色颜色互换
      }
    `
    const program = webglUtils.createProgramFromSources(gl, [vsSource, fsSource])

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')
    const textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize')

    const texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    )
    gl.enableVertexAttribArray(texCoordLocation)
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

    // 创建纹理
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // 设置参数，让我们可以绘制任何尺寸的图像
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    // 将图像上传到纹理
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    )

    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2f(textureSizeLocation, image.width, image.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  main()
})
</script>

<template lang="pug">
canvas#c9(width="400", height="400", style="width: 400px; height: 400px;")
</template>
