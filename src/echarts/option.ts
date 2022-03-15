/*
 * @Author: Li Jian
 * @Date: 2022-03-15 11:46:09
 * @LastEditTime: 2022-03-15 16:10:46
 * @LastEditors: Li Jian
 */
// import * as echarts from 'echarts'

// I don't know how to use this, so I just use the any type.
// how to use this?
type EchartsOption = any // echarts.EChartsOption
// 公用选项
const commonOptions: EchartsOption = {
  title: {
    text: '',
    textStyle: {
      color: '#679FCA',
      fontSize: 13,
      fontWeight: 'normal',
    },
    left: '5%',
    top: '5%',
  },
  grid: {
    top: '30%',
    left: '20%',
    right: '20%',
    bottom: '15%',
  },
  tooltip: {
    trigger: 'axis',
  },
}

const axisLine: EchartsOption = {
  axisLine: {
    show: true,
    lineStyle: {
      color: 'white',
    },
  },
}

const axisTick: EchartsOption = {
  axisTick: {
    show: false,
    // inside: true,
    // length: '60',
    // type: 'solid',
  },
}

const splitLine: EchartsOption = {
  splitLine: {
    show: true,
    interval: 0,
    lineStyle: {
      type: 'dotted',
    },
  },
}

const axisLabel: EchartsOption = {
  axisLabel: {
    fontSize: 9,
  },
}

// 柱状折线图
export const barLineOptions: EchartsOption = {
  ...commonOptions,
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: [],
    ...axisLine,
    ...axisTick,
    ...splitLine,
    ...axisLabel,
  },
  yAxis: [
    {
      name: '单位: 千米',
      type: 'value',
      nameTextStyle: {
        fontSize: 10,
        padding: [0, 0, 0, -40],
      },
      nameGap: 10,
      ...axisLine,
      ...axisLabel,
    },
    {
      name: '单位: 条',
      type: 'value',
      nameTextStyle: {
        fontSize: 10,
        padding: [0, 0, 0, 40],
      },
      nameGap: 10,
      ...axisLine,
      ...axisLabel,
    },
  ],
  series: [
    {
      // name: '单位: 千米',
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      itemStyle: {
        color: '#FFE900', // '#FFE900'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#FFE900', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#313649', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      smooth: true,
    },
    {
      // name: '单位: 条',
      data: [110, 250, 214, 238, 145, 117, 280],
      type: 'bar',
      yAxisIndex: 1,
      itemStyle: {
        color: '#03D6EA', // '#FFE900'
      },
    },
  ],
}

// 堆叠柱状图
export const stackBarOptions: EchartsOption = {
  ...commonOptions,
}

// 饼图
export const pieOptions: EchartsOption = {
  ...commonOptions,
}

// 柱状图
export const barOptions: EchartsOption = {
  ...commonOptions,
}
