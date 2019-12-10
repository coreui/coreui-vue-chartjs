# Coreui Vue Chartjs library

![NPM](https://img.shields.io/badge/npm-1.0.2-brightgreen)
![Downloads](https://img.shields.io/npm/dm/@coreui/coreui-vue-chartjs.svg?style=flat-square)
![Chart.js](https://img.shields.io/badge/Chart.js-^2.9.3-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue-^2.6.10-brightgreen.svg)

## Description

Dedicated components used to implement [Chart.js](https://www.chartjs.org/) in Vue.js. You can find the **library documentation** [here](https://coreui.io/vue/docs/components/charts)

## Features

- Implementation with ease - **You only need to pass 'datasets' prop and you have your chart working**. Optionally you can pass labels, options and plugins according to
[Chart.js docs](https://www.chartjs.org/docs/latest/getting-started/usage.html). The rest of chart.js configuration issues are already resolved,
- Chart will be rendered, even if you don't pass the labels, as empty labels will be generated automatically. You can also assign months or numeric indexes to labels (see prop description),
- If you don't pass tooltip options, coreui-custom-tooltips, would be used by default. They are resolving the chart.js issue with tooltip beeing cut, when exceeding the canvas.
- Dynamic updates of passed configuration. This feature makes your chart.js configuration automatically reactive to changes.

## Copyright and license

Copyright 2019 creativeLabs Łukasz Holeczek. Code released under the MIT license.
