/*
 * @Author: Li Jian
 * @Date: 2022-03-10 09:58:10
 * @LastEditTime: 2022-03-16 16:21:25
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
                start: [104.4193, 28.5441],
                end: [106.8097, 29.1092],
                toStation: ['Lucent 渝隆盛'],
                cableName: [
                  '±800kV直流复龙换流站～±800kV复奉线#378（复龙-隆盛）光接头盒）24芯OPGW光缆段01（±800kV复奉直流极二线路）',
                  '（500kV隆盛变～±800kV复奉线#378（复龙-隆盛）光接头盒）24芯OPGW光缆段(±800kV复奉线)',
                ],
                cableId: ['610151000000002368（四川）', '610150000000001880（重庆）'],
              },
              {
                start: [106.8097, 29.1092],
                end: [108.2728, 29.3934],
                toStation: ['Lucent 渝彭水'],
                cableName: ['（500kV隆盛变~220kV彭水变）24芯OPGW光缆段（800kV复奉线）'],
                cableId: ['610150000000001872（重庆）'],
              },
              {
                start: [108.2728, 29.3934],
                end: [110.7388, 29.5383],
                toStation: ['Lucent 湘江垭'],
                cableName: [
                  '（220kV彭水变～±800kV复奉线#930（彭水-江垭）光接头盒）24芯OPGW光缆段(800kV复奉线)',
                  '220kV江立线（彭水方向）10#/光接头盒～±800kV复奉线#930（彭水-江垭）光接头盒）24芯OPGW光缆段(±800kV复奉II线)',
                  '（江垭电厂～220kV江立线（彭水方向）10#/光接头盒）24芯OPGW光缆段（220kV江立线)',
                ],
                cableId: [
                  '610150000000001874（重庆）',
                  '610143000000005249（湖南）',
                  '610143000000005241（湖南）',
                ],
              },
              {
                start: [110.7388, 29.5383],
                end: [112.0339, 29.9164],
                toStation: ['Lucent 鄂潺陵'],
                cableName: [
                  '（500kV孱陵变～±800kV复奉线#1590（江垭-公安）光接头盒）24芯OPGW光缆段01（复奉线）(复奉线)',
                  '（220kV江立线（公安方向）10#/光接头盒～±800kV复奉线#1590（江垭-公安）光接头盒）24芯OPGW光缆段(±800kV复奉线)',
                  '（江垭电厂～220kV江立线（公安方向）10#/光接头盒）24芯OPGW光缆段（220kV江立线)',
                ],
                cableId: [
                  '610142000000004342（湖北）',
                  '610143000000005283（湖南）',
                  '610143000000005245（湖南）',
                ],
              },
              {
                start: [112.0339, 29.9164],
                end: [114.4161, 29.8403],
                toStation: ['Lucent 鄂咸宁'],
                cableName: ['（500kV孱陵变～500kV咸宁变）24芯OPGW光缆段01（复奉II线）(复奉II线)'],
                cableId: ['610142000000002809（湖北）'],
              },
              {
                start: [114.4161, 29.8403],
                end: [116.7421, 30.3166],
                toStation: ['Lucent 皖高士'],
                cableName: [
                  '（500kV咸宁变～±800kV复奉线#2481（高士-咸宁）光接头盒）48芯OPGW光缆段01（复奉II线）(复奉II线)',
                  '（高士中继站～±800kV复奉线＃2481（高士-咸宁）光接头盒）48芯OPGW光缆段/复奉线（复奉线）',
                ],
                cableId: ['610142000000004805（湖北）', '610134000000005065（安徽）'],
              },
              {
                start: [116.7421, 30.3166],
                end: [118.7984, 30.8758],
                toStation: ['Lucent 皖敬亭'],
                cableName: ['（500kV敬亭变～高士中继站）24芯OPGW光缆段/敬沥5368线(复奉线)'],
                cableId: ['610134000000002940（安徽）'],
              },
              {
                start: [118.7984, 30.8758],
                end: [120.3111, 30.7121],
                toStation: ['Lucent 浙含山'],
                cableName: [
                  '（±800kV复奉线#3292（敬亭-含山）光接头盒～500kV敬亭变）24芯OPGW光缆段/复奉线(复奉线)',
                  '（500kV含山变~±800kV±800kV复奉线#3292（敬亭-含山）光接头盒）24芯OPGW光缆段（复奉直流极2线路）',
                ],
                cableId: ['610134000000002099（安徽）', '610133000000009044（浙江）'],
              },
              {
                start: [120.3111, 30.7121],
                end: [121.7536, 30.9348],
                toStation: ['Lucent 沪奉贤'],
                cableName: [
                  '500kV含山变~±800kV复奉线#3688（含山-奉贤）光接头盒）24芯OPGW光缆段',
                  '(800kV奉贤换流站~±800kV复奉线#3688（含山-奉贤）光接头盒)24芯OPGW光缆段',
                ],
                cableId: ['610133000000000640（浙江）', '610131000000003079（上海）'],
              },
            ],
          },
          {
            start: [93.445, 42.592],
            end: [114.0931, 34.8551],
            startStation: [''],
            endStation: ['华为 豫中州1'],
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
          {
            start: [96.7212, 40.5994],
            end: [112.791, 27.6489],
            startStation: ['中兴 甘祁连换'],
            endStation: ['中兴 湘韶山换'],
            cableId: ['610099010000010004'],
            cableName: ['（±800kV祁连换流站通信站～800kV韶山换流站通信站）光缆01（祁韶I线）'],
            lineId: ['120699010000000043'],
            lineName: ['祁韶I线'],
            children: [],
          },
          {
            start: [112.4628, 39.6618],
            end: [118.5998, 33.0635],
            startStation: ['华为 晋雁门关'],
            endStation: ['华为 苏淮安'],
            cableId: ['610099010000010005'],
            cableName: ['（±800kV雁门关站通信站～±800kV淮安换流站通信站）光缆01（雁淮I线）'],
            lineId: ['120699010000000045'],
            lineName: ['雁淮I线'],
            children: [],
          },
          {
            start: [116.5104, 44.2552],
            end: [119.9688, 33.107],
            startStation: ['中兴 蒙锡林浩特'],
            endStation: ['中兴 苏泰州'],
            cableId: ['610099010000010006'],
            cableName: ['（±800kV锡盟换流站通信站～1000kV泰州换流站通信站）光缆01（锡泰I线）'],
            lineId: ['120699010000000049'],
            lineName: ['锡泰I线'],
            children: [],
          },
          {
            start: [121.4, 44.28],
            end: [118.613, 36.8945],
            startStation: ['中兴 蒙扎鲁特'],
            endStation: ['中兴 鲁广固'],
            cableId: ['610099010000010007'],
            cableName: ['（±800kV扎鲁特换流站通信站～800kV广固换通信站）光缆01（鲁固I线）'],
            lineId: ['120699010000000053'],
            lineName: ['鲁固I线'],
            children: [],
          },
          {
            start: [89.1281, 44.6593],
            end: [118.62, 31.0392],
            startStation: ['中兴 蒙扎鲁特'],
            endStation: ['中兴 鲁广固'],
            cableId: ['610099010000010008'],
            cableName: ['（±1100kV昌吉换流站通信站～1100kV古泉换流站通信站）光缆01（吉泉I线）'],
            lineId: ['120699010000000057'],
            lineName: ['吉泉I线'],
            children: [],
          },
          {
            start: [106.5015, 38.8639],
            end: [118.6188, 35.5497],
            startStation: ['华为 蒙伊克昭'],
            endStation: ['华为 鲁沂南'],
            cableId: ['610099010000010009'],
            cableName: ['（±800kV伊克昭换流站通信站～800kV沂南换通信站）光缆01（昭沂I线）'],
            lineId: ['120699010000000051'],
            lineName: ['昭沂I线'],
            children: [],
          },
          {
            start: [100.475, 36.1175],
            end: [114.0551, 34.81],
            startStation: ['中兴 青青南'],
            endStation: ['中兴 豫豫南'],
            cableId: ['610099010000010010'],
            cableName: ['（±800kV青南换流站通信站～豫南换流站通信站）光缆01（青豫I线）'],
            lineId: ['120699010000000004'],
            lineName: ['青豫I线'],
            children: [],
          },
          {
            start: [110.8284, 38.9839],
            end: [114.2, 30.3],
            startStation: ['中兴 陕陕北'],
            endStation: ['中兴 鄂武汉'],
            cableId: ['610099010000010012'],
            cableName: ['（±800kV陕北站通信站～±800kV特高压武汉站通信站）光缆01（陕武I线）'],
            lineId: ['120699010000000006'],
            lineName: ['陕武I线'],
            children: [],
          },
          {
            start: [112.8013, 36.1074],
            end: [112.775, 33.2347],
            startStation: ['长治'],
            endStation: ['南阳'],
            cableId: ['610099010000010013'],
            cableName: ['（1000kV长治变通信站～1000kV特高压南阳站通信站）光缆01（长南I线）'],
            lineId: ['120199010000000068'],
            lineName: ['长南I线'],
            children: [],
          },
          {
            start: [112.775, 33.2347],
            end: [112.4187, 30.8165],
            startStation: ['南阳'],
            endStation: ['荆门'],
            cableId: ['610099010000010014'],
            cableName: ['（1000kV特高压南阳站通信站～1000kV荆门特高压变通信站）光缆01（南荆I线）'],
            lineId: ['120199010000000069'],
            lineName: ['南荆I线'],
            children: [],
          },
        ],
      })
    },
  },
  {
    url: '/api/getLeftTopChartData',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: {
          text: '通信光缆',
          xAxis: ['OPGW', 'ADSS', '普通光缆'],
          yAxis: [
            {
              name: '单位: 千米',
            },
            {
              name: '单位: 条',
            },
          ],
          series: [
            {
              data: [25000, 35000, 18000],
            },
            {
              data: [500, 800, 600],
            },
          ],
        },
      })
    },
  },
  {
    url: '/api/getLeftMiddleChartData',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: {
          text: '通信设备',
          series: {
            data: [
              {
                value: 1025,
                name: '传输设备',
              },
              {
                value: 234,
                name: '支撑网设备',
              },
              {
                value: 567,
                name: '业务网设备',
              },
            ],
          },
        },
      })
    },
  },
  {
    url: '/api/getLeftBottomChartData',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: {
          text: '通信光缆',
          xAxis: ['继电保护', '安全自动装置', '自动化'],
          yAxis: [
            {
              name: '单位: 条',
            },
          ],
          series: [
            {
              name: '单通道',
              data: [25000, 35000, 18000],
            },
            {
              name: '双通道',
              data: [24000, 25000, 28000],
            },
          ],
        },
      })
    },
  },
  {
    url: '/api/getRightTopChartData',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: {
          text: '通信光缆',
          xAxis: ['西北', '西南', '华北', '华东', '华中', '东北'],
          yAxis: [
            {
              name: '单位: 条',
            },
          ],
          series: [
            {
              name: '根告警数',
              data: [25000, 35000, 18000, 20000, 30000, 40000],
            },
            {
              name: '告警确认数',
              data: [24000, 25000, 28000, 30000, 40000, 50000],
            },
          ],
        },
      })
    },
  },
  {
    url: '/api/getRightMiddleChartData',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: {
          text: '通信设备',
          series: {
            data: [
              {
                value: 1023,
                name: '传输设备',
              },
              {
                value: 234,
                name: '支撑网设备',
              },
              {
                value: 567,
                name: '业务网设备',
              },
            ],
          },
        },
      })
    },
  },
  {
    url: '/api/getRightBottomChartData',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        type: 'success',
        data: {
          text: '通信光缆',
          xAxis: ['OPGW', 'ADSS', '普通光缆'],
          yAxis: [
            {
              name: '单位: 千米',
            },
            {
              name: '单位: 条',
            },
          ],
          series: [
            {
              data: [25200, 15300, 18400],
            },
            {
              data: [510, 430, 620],
            },
          ],
        },
      })
    },
  },
] as MockMethod[]
