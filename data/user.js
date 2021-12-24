/*
 * @Author: Li Jian
 * @Date: 2021-12-21 08:58:38
 * @LastEditTime: 2021-12-24 08:49:49
 * @LastEditors: Li Jian
 * @Description: 加载数据-动态
 */
// let datum = []
// let from = []
// let to = []
// for (var i = 0; i < 3; i++) {
//   if (i === 0) {
//     from = []
//   } else if (i === 9) {
//     to = []
//   } else {
//     from = [i, i, i, i, i, i]
//     to = [i + 1, i + 1, i + 1, i + 1, i + 1, i + 1]
//   }
//   datum.push({
//     id: i,
//     name: '杆塔' + i,
//     position: [-50 + i * 10, 0, 0],
//     fiber: {
//       from,
//       to,
//     },
//   })
// }
// console.log(datum)
export default {
  plane: {
    // 地面-面积
    plainSizeWidth: 300, // 地面宽度(x轴)
    plainSizeHeight: 200, // 地面高度(z轴)
  },
  // towers: datum,
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
        to: [],
      },
    },
  ],
}
