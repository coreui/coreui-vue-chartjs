/* eslint-disable vue/one-component-per-file */
import { App, defineComponent, h } from 'vue'
import CChart from './CChart'

const CChartBar = defineComponent({
  name: 'CChartBar',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'bar' })
  },
})

const CChartBubble = defineComponent({
  name: 'CChartBubble',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'bubble' })
  },
})

const CChartDoughnut = defineComponent({
  name: 'CChartDoughnut',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'doughnut' })
  },
})

const CChartLine = defineComponent({
  name: 'CChartLine',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'line' })
  },
})

const CChartPie = defineComponent({
  name: 'CChartPie',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'pie' })
  },
})

const CChartPolarArea = defineComponent({
  name: 'CChartPolarArea',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'polarArea' })
  },
})

const CChartRadar = defineComponent({
  name: 'CChartRadar',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'radar' })
  },
})

const CChartScatter = defineComponent({
  name: 'CChartScatter',
  extends: CChart,
  setup(props) {
    return () => h(CChart, { ...props, type: 'scatter' })
  },
})

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

export default CChartPlugin

export {
  CChart,
  CChartBar,
  CChartBubble,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
  CChartScatter,
}
