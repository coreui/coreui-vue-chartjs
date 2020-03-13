<script>
import Chart from 'chart.js'
import { customTooltips } from '@coreui/coreui-chartjs/dist/js/coreui-chartjs.js'

export default {
  name: '',
  type: '',
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
  watch: {
    chartConfig () {
      this.updateChart()
    }
  },
  mounted () {
    this.renderChart()
  },
  beforeDestroy () {
    this.destroyChart()
  },
  computed: {
    safeId () {
      // as long as this._uid() works there is no need to generate the key
      const key = () => Math.random().toString(36).replace('0.', '')
      return '__safe_id__' + (this._uid || key())
    },
    computedDatasets () {
      return this.datasets
    },
    computedLabels () {
      if (this.labels && typeof this.labels !== 'string') {
        return this.labels
      } else if (!this.datasets || !this.datasets[0] || !this.datasets[0].data) {
        return []
      }
      const emptyLabels = Array(this.datasets[0].data.length).fill('')

      if (this.labels === 'indexes') {
        return emptyLabels.map((u, i) => i + 1)
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
      if (this.options && this.options.tooltips) {
        return
      }
      return {
        tooltips: {
          enabled: false,
          custom: customTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor(tooltipItem, chart) {
              function getValue(prop) {
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
              return {
                backgroundColor
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
  render(h) {
    return h(
      'div',
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
</script>

<style>
  @import "~@coreui/coreui-chartjs/dist/css/coreui-chartjs.css";
</style>
