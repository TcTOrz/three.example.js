/*
 * @Author: Li Jian
 * @Date: 2021-12-21 08:58:21
 * @LastEditTime: 2021-12-23 21:13:21
 * @LastEditors: Li Jian
 * @Description: 基础数据-静态
 */
export default {
  canvas: '#c', // canvas dom id
  color: {
    skyColor: 0xb5c8db, // 天空颜色
  },
  camera: {
    fov: 70, // 相机视角
    aspect: (canvas) => canvas.width / canvas.height, // 相机宽高比
    near: 0.1, // 相机近距离
    far: 1000, // 相机远距离
    position: [0, 70, 50], // 相机位置
  },
  plane: {
    // 地面
    imgUrl: '../static/images/grass.jpg', // 地面图片地址
  },
  lights: {
    // 光照
    directionalLight: {
      // 方向光
      color: 0xffffff, // 颜色
      intensity: 1, // 强度
      position: [0, 10, 0], // 位置
      targetPosition: [-5, 0, 0], // 照向位置
    },
  },
  tower: {
    // 杆塔
    mtl: '../blender/tower/corset-power-transmission-tower.mtl', // 杆塔模型mtl文件地址
    obj: '../blender/tower/corset-power-transmission-tower.obj', // 杆塔模型obj文件地址
    glb: '../blender/tower/corset-power-transmission-tower.glb', // 杆塔模型glb文件地址
    scaler: 0.4, // 杆塔缩放比例
  },
}
