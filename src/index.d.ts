import Vue from 'vue'

export declare class CChart extends Vue {
  datasets: Array<object>
  labels: [string, Array<string>]
  options: object
  plugins: Array<any>
}

export declare class CChartBar extends CChart {}
export declare class CChartHorizontalBar extends CChart {}
export declare class CChartLine extends CChart {}
export declare class CChartDoughnut extends CChart {}
export declare class CChartRadar extends CChart {}
export declare class CChartPie extends CChart {}
export declare class CChartPolarArea extends CChart {}

import { PluginFunction } from 'vue'
export interface CoreuiVueChartsPlugin {
  install: PluginFunction<Function>
}
declare const CoreuiVueCharts: CoreuiVueChartsPlugin

export default CoreuiVueCharts