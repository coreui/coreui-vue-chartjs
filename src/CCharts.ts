import Chart from './Chart'

const CChartBar = Object.assign({}, Chart, {
  name: 'CChartBar',
  type: 'bar'
})
const CChartHorizontalBar = Object.assign({}, Chart, {
  name: 'CChartHorizontalBar',
  type: 'horizontalBar'
})
const CChartLine = Object.assign({}, Chart, {
  name: 'CChartLine',
  type: 'line'
})
const CChartDoughnut = Object.assign({}, Chart, {
  name: 'CChartDoughnut',
  type: 'doughnut'
})
const CChartRadar = Object.assign({}, Chart, {
  name: 'CChartRadar',
  type: 'radar'
})
const CChartPie = Object.assign({}, Chart, {
  name: 'CChartPie',
  type: 'pie'
})
const CChartPolarArea = Object.assign({}, Chart, {
  name: 'CChartPolarArea',
  type: 'polarArea'
})

export {
  CChartBar,
  CChartHorizontalBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
}

const CoreuiVueCharts = {
  install (Vue) {
    Vue.component('CChartBar', CChartBar)
    Vue.component('CChartHorizontalBar', CChartHorizontalBar)
    Vue.component('CChartLine', CChartLine)
    Vue.component('CChartDoughnut', CChartDoughnut)
    Vue.component('CChartRadar', CChartRadar)
    Vue.component('CChartPie', CChartPie)
    Vue.component('CChartPolarArea', CChartPolarArea)
  }
}

// Export library
export default CoreuiVueCharts
