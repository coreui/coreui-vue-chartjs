import generateChartComponent from './generateChartComponent'

const CChartBar = generateChartComponent('CChartBar', 'bar')
const CChartLine = generateChartComponent('CChartLine', 'line')
const CChartDoughnut = generateChartComponent('CChartDoughnut', 'doughnut')
const CChartRadar = generateChartComponent('CChartRadar', 'radar')
const CChartPie = generateChartComponent('CChartPie', 'pie')
const CChartPolarArea = generateChartComponent('CChartPolarArea', 'polarArea')

export {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
}

const CoreuiVueCharts = {
  install (Vue) {
    Vue.component('CChartBar', CChartBar)
    Vue.component('CChartLine', CChartLine)
    Vue.component('CChartDoughnut', CChartDoughnut)
    Vue.component('CChartRadar', CChartRadar)
    Vue.component('CChartPie', CChartPie)
    Vue.component('CChartPolarArea', CChartPolarArea)
  }
}

// Export library
export default CoreuiVueCharts
