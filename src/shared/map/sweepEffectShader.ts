/*
 * @Author: Li Jian
 * @Date: 2022-03-01 14:43:14
 * @LastEditTime: 2022-03-01 16:18:03
 * @LastEditors: Li Jian
 * @Description: 扫光特效
 */
import { MapInterface, SweepEffectShaderInterface } from './type'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

export default class SweepEffectShader implements SweepEffectShaderInterface {
  vertexShader: string
  fragmentShader: string
  ins: MapInterface
  composer!: EffectComposer
  shaderPass!: ShaderPass
  constructor(ins: MapInterface) {
    this.ins = ins
    ;[this.vertexShader, this.fragmentShader] = this.getShader()
    this.draw()
    return this
  }
  draw() {
    const ins = this.ins
    this.composer = new EffectComposer(ins.renderer)
    const renderPass = new RenderPass(ins.scene, ins.camera)
    this.composer.addPass(renderPass)
    const shader = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        time: { value: -1.0 },
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
    })
    const pass = (this.shaderPass = new ShaderPass(shader))
    this.composer.addPass(pass)
  }
  getShader(): [string, string] {
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 iPosition;
      void main() {
        vUv = uv;
        iPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const fragmentShader = `
      uniform float time;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      varying vec3 iPosition;
      void main() {
        vec4 texel = texture2D(tDiffuse, vUv);
        float x = iPosition.x;
        float lighty = -x * 1.1 + time;
        float alpha = abs(iPosition.y - lighty);
        if(alpha < 0.1) {
          float a = 1.0 - alpha / 0.1;
          float enda = smoothstep(0.0, 1.0, a) + 1.3;
          gl_FragColor = texel * enda;
        } else {
          gl_FragColor = texel;
        }
      }
    `
    return [vertexShader, fragmentShader]
  }
  animate(dt: number) {
    this.composer.render()
    this.shaderPass.uniforms['time'].value += dt * 1.5
    if (this.shaderPass.uniforms['time'].value > 15) {
      this.shaderPass.uniforms['time'].value = -1
    }
  }
  toggle() {
    this.composer.passes[1].enabled = !this.composer.passes[1].enabled
  }
}
