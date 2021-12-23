/*
 * @Author: Li Jian
 * @Date: 2021-12-21 08:58:38
 * @LastEditTime: 2021-12-21 15:53:04
 * @LastEditors: Li Jian
 * @Description: 加载数据-动态
 */
export default {
  plane: {
    // 地面-面积
    plainSizeWidth: 300, // 地面宽度(x轴)
    plainSizeHeight: 200, // 地面高度(z轴)
  },
  towers: [
    // 杆塔数组
    {
      id: 1, // 杆塔id
      name: '杆塔1', // 杆塔名称
      position: [-50, 0, 0], // 杆塔位置
      // rotation: [0, 0, 0], // 杆塔旋转角度
      // scale: [1, 1, 1], // 杆塔缩放比例
      fiber: {
        // 杆塔电缆
        from: [], // 起始电缆 - 电缆id - 可以为空数组, 如果为空数组, 则表示该杆塔是起始电缆
        to: [2, 2, 2, 2, 2, 2], // 终止电缆 - 电缆id - 可以为空数组, 如果为空数组, 则表示该杆塔是终止电缆
      },
    },
    {
      id: 2,
      name: '杆塔2',
      position: [0, 10, 0],
      fiber: {
        from: [1, 1, 1, 1, 1, 1],
        to: [3, 3, 3, 3, 3, 3],
      },
    },
    {
      id: 3,
      name: '杆塔3',
      position: [50, 0, 0],
      fiber: {
        from: [2, 2, 2, 2, 2, 2],
        to: [4, 4, 4, 4, 4, 4],
      },
    },
    {
      id: 4,
      name: '杆塔4',
      position: [75, 0, -25],
      fiber: {
        from: [3, 3, 3, 3, 3, 3],
        to: [],
      },
    },
  ],
}
