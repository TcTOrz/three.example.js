/*
 * @Author: Li Jian
 * @Date: 2022-03-15 11:46:09
 * @LastEditTime: 2022-03-16 16:24:31
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

const legend: EchartsOption = {
  legend: {
    show: true,
    textStyle: {
      color: 'white',
      fontSize: 10,
    },
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 5,
    top: '15%',
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
      name: '',
      type: 'value',
      nameTextStyle: {
        fontSize: 10,
        padding: [0, 0, 0, -40],
      },
      nameGap: 10,
      ...axisLine,
      ...axisLabel,
      ...splitLine,
    },
    {
      name: '',
      type: 'value',
      nameTextStyle: {
        fontSize: 10,
        padding: [0, 0, 0, 40],
      },
      nameGap: 10,
      ...axisLine,
      ...axisLabel,
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      // name: '单位: 千米',
      data: [],
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
      data: [],
      barWidth: '40%',
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
  ...legend,
  xAxis: {
    type: 'category',
    data: [],
    ...axisLine,
    ...axisTick,
    ...splitLine,
    ...axisLabel,
  },
  yAxis: {
    name: '',
    type: 'value',
    nameTextStyle: {
      fontSize: 10,
      padding: [0, 0, 0, 350],
    },
    nameGap: 20,
    ...axisLine,
    ...axisLabel,
    ...splitLine,
  },
  series: [
    {
      name: '',
      data: [],
      type: 'bar',
      stack: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#05FF03', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#5ABA5E', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      name: '',
      data: [],
      type: 'bar',
      stack: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#F6BD16', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#BBA95B', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
}

// 饼图
export const pieOptions: EchartsOption = {
  ...commonOptions,
  legend: {
    show: true,
    bottom: '5%',
    textStyle: {
      color: 'white',
      fontSize: 10,
    },
    icon: 'circle',
    itemWidth: 6,
    itemHeight: 6,
    // data: ['#E86352', '#F5BD15', '#5140F1'],
  },
  tooltip: {
    trigger: 'item',
  },
  color: ['#E86352', '#F5BD15', '#5140F1'],
  series: {
    type: 'pie',
    radius: '50%',
    data: [],
    label: {
      alignTo: 'edge',
      edgeDistance: 15,
      formatter: '{name|{b}}\n{number|{c}}{text|台}',
      rich: {
        name: {
          fontSize: 10,
          color: 'white',
        },
        number: {
          fontSize: 10,
          color: 'white',
        },
        text: {
          fontSize: 10,
          color: 'white',
        },
      },
    },
    labelLayout: function (params: { labelRect: { x: number; width: any }; labelLinePoints: any }) {
      const isLeft = params.labelRect.x < 50 // myChart.getWidth() / 2
      const points = params.labelLinePoints
      // Update the end point.
      points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
      return {
        labelLinePoints: points,
      }
    },
    // colorBy: 'data',
  },
}

// 柱状图
export const barOptions: EchartsOption = {
  ...commonOptions,
  ...legend,
  xAxis: {
    type: 'category',
    data: [],
    ...axisLine,
    ...axisTick,
    ...splitLine,
    ...axisLabel,
  },
  yAxis: {
    name: '',
    type: 'value',
    nameTextStyle: {
      fontSize: 10,
      padding: [0, 0, 0, 350],
    },
    nameGap: 20,
    ...axisLine,
    ...axisLabel,
    ...splitLine,
  },
  series: [
    {
      name: '',
      data: [],
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#03F4FF', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#5A7BBA', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    {
      name: '',
      data: [],
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#05FF03', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#5ABA5E', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
}
