/*
 * @Author: Li Jian
 * @Date: 2022-03-10 09:58:10
 * @LastEditTime: 2022-03-10 16:14:32
 * @LastEditors: Li Jian
 */
import { MockMethod } from 'vite-plugin-mock'
// const Mock = require('mockjs')
import Mock from 'mockjs'

export default [
  {
    url: '/api/point',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: [
          {
            position: [121.48941, 31.40527],
            // radius: 4,
            // color: '#0000ff',
            // opacity: 1,
            // speed: 4,
          },
          {
            position: [91.13775, 29.65262],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
          {
            position: [116.23128, 40.22077],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
          {
            position: [113.6401, 34.72468],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
          {
            position: [113.88308, 22.55329],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
          {
            position: [81.32416, 43.91689],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
          {
            position: [126.95717, 45.54774],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
          {
            position: [112.29162, 3.981086],
            // radius: 3,
            // color: '#ff0000',
            // opacity: 0.5,
            // speed: 2,
          },
        ],
      })
    },
  },
  {
    url: '/api/flyline',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: [
          {
            name: '复奉II线',
            info: '（复龙换流站通信站～800kV奉贤换流站通信站）光缆01（复奉I线）',
            path: [
              [121.48941, 31.40527],
              [91.13775, 29.65262],
            ],
          },
          // {
          //   name: '光缆1',
          //   info: '一些测试信息',
          //   path: [
          //     [121.48941, 31.40527],
          //     [116.23128, 40.22077],
          //   ],
          // },
          // {
          //   name: '光缆2',
          //   info: '一些测试信息',
          //   path: [
          //     [121.48941, 31.40527],
          //     [113.6401, 34.72468],
          //   ],
          // },
          // {
          //   name: '光缆3',
          //   info: '一些测试信息',
          //   path: [
          //     [121.48941, 31.40527],
          //     [113.88308, 22.55329],
          //   ],
          // },
          // {
          //   name: '光缆4',
          //   info: '一些测试信息',
          //   path: [
          //     [121.48941, 31.40527],
          //     [81.32416, 43.91689],
          //   ],
          // },
          // {
          //   name: '光缆5',
          //   info: '一些测试信息',
          //   path: [
          //     [121.48941, 31.40527],
          //     [126.95717, 45.54774],
          //   ],
          // },
          // {
          //   name: '光缆6',
          //   info: '一些测试信息',
          //   path: [
          //     [121.48941, 31.40527],
          //     [112.29162, 3.981086],
          //   ],
          // },
        ],
      })
    },
  },
  {
    url: '/api/pointAndFlyline',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: [
          {
            start: [104.4193, 28.5441],
            end: [121.7536, 30.9348],
            startStation: ['Lucent 川复龙'],
            endStation: ['Lucent 沪奉贤'],
            cableId: ['610099010000010001'],
            cableName: ['（复龙换流站通信站～800kV奉贤换流站通信站）光缆01（复奉I线）'],
            lineId: ['120699010000000010'],
            lineName: ['复奉II线'],
            children: [
              {
                to: [106.8097, 29.1092],
                toStation: ['Lucent 渝隆盛'],
                cableName: [
                  '±800kV直流复龙换流站～±800kV复奉线#378（复龙-隆盛）光接头盒）24芯OPGW光缆段01（±800kV复奉直流极二线路）',
                  '（500kV隆盛变～±800kV复奉线#378（复龙-隆盛）光接头盒）24芯OPGW光缆段(±800kV复奉线)',
                ],
                cableId: ['610151000000002368（四川）', '610150000000001880（重庆）'],
              },
              {
                to: [108.2728, 29.3934],
                toStation: ['Lucent 渝彭水'],
                cableName: ['（500kV隆盛变~220kV彭水变）24芯OPGW光缆段（800kV复奉线）'],
                cableId: ['610150000000001872（重庆）'],
              },
            ],
          },
          {
            start: [93.445, 42.592],
            end: [114.0931, 34.8551],
            startStation: [''],
            endStation: ['华为 豫中州1]'],
            cableId: ['610099010000010002'],
            cableName: ['（±800kV天山换流站通信站～中州换流站通信站）光缆01（天中I线）'],
            lineId: ['120699010000000028'],
            lineName: ['天中I线'],
            children: [],
          },
          {
            start: [106.5199, 37.7291],
            end: [120.218, 29.9423],
            startStation: [''],
            endStation: ['中兴 浙绍兴站'],
            cableId: ['610099010000010003'],
            cableName: ['（±800kV灵州站通信站～800kV绍兴换流站通信站）光缆01（灵绍I线）'],
            lineId: ['120699010000000035'],
            lineName: ['灵绍I线'],
            children: [],
          },
        ],
      })
    },
  },
] as MockMethod[]
