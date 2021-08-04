import { App } from 'vue'
import { defineCChartComponent } from './CChartComponent'

export const CChart = defineCChartComponent('CChart', undefined)
export const CChartBar = defineCChartComponent('CChartBar', 'bar')
export const CChartBubble = defineCChartComponent('CChartBubble', 'bubble')
export const CChartDoughnut = defineCChartComponent('CChartDoughnut', 'doughnut')
export const CChartLine = defineCChartComponent('CChartLine', 'line')
export const CChartPie = defineCChartComponent('CChartPie', 'pie')
export const CChartPolarArea = defineCChartComponent('CChartPolarArea', 'polarArea')
export const CChartRadar = defineCChartComponent('CChartRadar', 'radar')
export const CChartScatter = defineCChartComponent('CChartScatter', 'scatter')


const CChartPlugin = {
  install: (app: App): void => {
    app.component('CChart', CChart)
    app.component('CChartBar', CChartBar)
    app.component('CChartBubble', CChartBubble)
    app.component('CChartDoughnut', CChartDoughnut)
    app.component('CChartLine', CChartLine)
    app.component('CChartPie', CChartPie)
    app.component('CChartPolarArea', CChartPolarArea)
    app.component('CChartRadar', CChartRadar)
    app.component('CChartScatter', CChartScatter)
  },
}

export default {
  CChart,
  CChartBar,
  CChartBubble,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
  CChartScatter,
  CChartPlugin,
}
