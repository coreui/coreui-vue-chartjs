import Chart from 'chart.js'
import { customTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default function generateChartComponent (name, type) {
  return {
    name,
    type,
    props: {
      datasets: Array,
      labels: [Array, String],
      options: Object,
      plugins: Array
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    data () {
      return {
        chart: undefined
      }
    },
    computed: {
      safeId () {
        return this._uid
      },
      computedDatasets () {
        return this.datasets
      },
      computedLabels () {
        if (this.labels && typeof this.labels !== 'string') {
          return this.labels
        }
        const emptyLabels = Array(this.datasets[0].data.length).fill('')

        if (this.labels === 'indexes') {
          return emptyLabels.map((u, i) => i)
        } else if (this.labels === 'months') {
          return emptyLabels.map((u, i) => this.$options.months[i % 12])
        }
        return emptyLabels
      },
      computedData () {
        return {
          datasets: this.computedDatasets,
          labels: this.computedLabels
        }
      },
      customTooltips () {
        if (!this.options || !this.options.tooltips) {
          return {
            tooltips: {
              enabled: false,
              custom: customTooltips,
              intersect: true,
              mode: 'index',
              position: 'nearest',
              callbacks: {
                labelColor (tooltipItem, chart) {
                  function getValue (prop) {
                    return typeof prop === 'object' ? prop[tooltipItem.index] : prop
                  }
                  const dataset = chart.data.datasets[tooltipItem.datasetIndex]
                  //tooltipLabelColor is coreUI custom prop used only here
                  const backgroundColor = getValue(
                    dataset.tooltipLabelColor ||
                    dataset.pointHoverBackgroundColor ||
                    dataset.borderColor ||
                    dataset.backgroundColor
                  )
                  return { backgroundColor }
                }
              }
            }
          }
        }
      },
      computedOptions () {
        return Object.assign({}, this.options, this.customTooltips || {})
      },
      chartConfig () {
        return {
          type: this.$options.type,
          data: this.computedData,
          options: this.computedOptions || this.options,
          plugins: this.plugins
        }
      }
    },
    watch: {
      chartConfig () {
        this.updateChart()
      }
    },
    mounted () {
      this.renderChart()
    },
    methods: {
      renderChart () {
        this.destroyChart()
        this.chart = new Chart(
          this.$refs.canvas.getContext('2d'),
          this.chartConfig
        )
      },
      updateChart () {
        Object.assign(this.chart, this.chartConfig)
        this.chart.update()
      },
      destroyChart () {
        if (this.chart) {
          this.chart.destroy()
        }
      }
    },
    beforeDestroy () {
      this.destroyChart()
    },
    render (h) {
      return h(
        'div',
        {
          staticClass: 'c-position-relative c-w-100'
        },
        [
          h(
            'canvas', {
              attrs: {
                id: this.safeId
              },
              ref: 'canvas'
            }
          )
        ]
      )
    }
  }
}
