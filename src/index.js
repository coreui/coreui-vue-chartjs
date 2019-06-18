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
    for (let component in [
      CChartBar, CChartLine, CChartDoughnut,
      CChartRadar, CChartPie,CChartPolarArea
    ]) {
      Vue.component(component, component)
    }
  }
}

// Export library
export default CoreuiVueCharts
