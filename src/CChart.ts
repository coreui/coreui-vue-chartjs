import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  onUpdated,
  PropType,
  ref,
  Ref,
  shallowRef,
} from 'vue'

import Chart, { ChartData, ChartOptions, ChartType, Plugin } from 'chart.js/auto'
import { customTooltips as cuiCustomTooltips } from '@coreui/chartjs'

import assign from 'lodash/assign'
import find from 'lodash/find'
import merge from 'lodash/merge'

const CChart = defineComponent({
  name: 'CChart',
  props: {
    /**
     * Enables custom html based tooltips instead of standard tooltips.
     *
     * @default true
     */
    customTooltips: {
      type: Boolean,
      default: true,
    },
    /**
     * The data object that is passed into the Chart.js chart (more info).
     */
    data: {
      type: [Object, Function] as PropType<ChartData | ((canvas: HTMLCanvasElement) => ChartData)>,
      required: true,
    },
    /**
     * Height attribute applied to the rendered canvas.
     *
     * @default 150
     */
    height: {
      type: Number,
      default: 150,
    },
    /**
     * ID attribute applied to the rendered canvas.
     */
    id: {
      type: String,
    },
    /**
     * The options object that is passed into the Chart.js chartRef.value.
     *
     * {@link https://www.chartjs.org/docs/latest/general/options.html More Info}
     */
    options: {
      type: Object as PropType<ChartOptions>,
    },
    /**
     * The plugins array that is passed into the Chart.js chart (more info)
     *
     * {@link https://www.chartjs.org/docs/latest/developers/plugins.html More Info}
     */
    plugins: {
      type: Array as PropType<Plugin[]>,
    },
    /**
     * If true, will tear down and redraw chart on all updates.
     */
    redraw: Boolean,
    /**
     * Chart.js chart type.
     *
     * @type 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter'
     */
    type: {
      type: String as PropType<ChartType>,
      default: 'bar',
    },
    /**
     * Width attribute applied to the rendered canvas.
     *
     * @default 300
     */
    width: {
      type: Number,
      default: 300,
    },
    /**
     * Put the chart into the wrapper div element.
     *
     * @default true
     */
    wrapper: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    /**
     * Proxy for Chart.js getDatasetAtEvent. Calls with dataset and triggering event.
     */
    'getDatasetAtEvent',
    /**
     * Proxy for Chart.js getElementAtEvent. Calls with single element array and triggering event.
     */
    'getElementAtEvent',
    /**
     * Proxy for Chart.js getElementsAtEvent. Calls with element array and triggering event.
     */
    'getElementsAtEvent',
  ],
  setup(props, { expose, emit, slots }) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const chartRef = shallowRef<Chart | null>(null)

    const computedData = computed(() =>
      typeof props.data === 'function'
        ? canvasRef.value
          ? props.data(canvasRef.value)
          : { datasets: [] }
        : merge({}, props.data),
    )

    const computedOptions = computed(() =>
      props.customTooltips
        ? merge({}, props.options, {
            plugins: {
              tooltip: {
                enabled: false,
                mode: 'index',
                position: 'nearest',
                external: cuiCustomTooltips,
              },
            },
          })
        : props.options,
    )

    const renderChart = () => {
      if (!canvasRef.value) return

      chartRef.value = new Chart(canvasRef.value, {
        type: props.type,
        data: computedData.value,
        options: computedOptions.value,
        plugins: props.plugins,
      })
    }

    const handleOnClick = (e: Event) => {
      if (!chartRef.value) return

      emit(
        'getDatasetAtEvent',
        chartRef.value.getElementsAtEventForMode(e, 'dataset', { intersect: true }, false),
        e,
      )
      emit(
        'getElementAtEvent',
        chartRef.value.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false),
        e,
      )
      emit(
        'getElementsAtEvent',
        chartRef.value.getElementsAtEventForMode(e, 'index', { intersect: true }, false),
        e,
      )
    }

    const updateChart = () => {
      if (!chartRef.value) return

      if (props.options) {
        chartRef.value.options = { ...props.options }
      }

      if (!chartRef.value.config.data) {
        chartRef.value.config.data = computedData.value
        chartRef.value.update()
        return
      }

      const { datasets: newDataSets = [], ...newChartData } = computedData.value
      const { datasets: currentDataSets = [] } = chartRef.value.config.data

      // copy values
      assign(chartRef.value.config.data, newChartData)
      chartRef.value.config.data.datasets = newDataSets.map((newDataSet: any) => {
        // given the new set, find it's current match
        const currentDataSet = find(
          currentDataSets,
          (d: any) => d.label === newDataSet.label && d.type === newDataSet.type,
        )

        // There is no original to update, so simply add new one
        if (!currentDataSet || !newDataSet.data) return newDataSet

        if (!currentDataSet.data) {
          currentDataSet.data = []
        } else {
          currentDataSet.data.length = newDataSet.data.length
        }

        // copy in values
        assign(currentDataSet.data, newDataSet.data)

        // apply dataset changes, but keep copied data
        return {
          ...currentDataSet,
          ...newDataSet,
          data: currentDataSet.data,
        }
      })

      chartRef.value && chartRef.value.update()
    }

    const destroyChart = () => {
      if (chartRef.value) chartRef.value.destroy()
    }

    onMounted(() => {
      renderChart()
    })

    onUnmounted(() => {
      destroyChart()
    })

    onUpdated(() => {
      if (props.redraw) {
        destroyChart()
        setTimeout(() => {
          renderChart()
        }, 0)
      } else {
        updateChart()
      }
    })

    const canvas = (ref: Ref<HTMLCanvasElement | null>) =>
      h(
        'canvas',
        {
          id: props.id,
          height: props.height,
          width: props.width,
          onClick: (e: Event) => handleOnClick(e),
          role: 'img',
          ref: ref,
        },
        {
          fallbackContent: () => slots.fallback && slots.fallback(),
        },
      )

    expose({ chart: chartRef })

    return () =>
      props.wrapper ? h('div', { class: 'chart-wrapper' }, canvas(canvasRef)) : canvas(canvasRef)
  },
})

export default CChart
