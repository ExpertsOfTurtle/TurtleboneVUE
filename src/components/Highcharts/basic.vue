<template>
  <div class="x-bar">
    <div :id="id"  :option="option"></div>
  </div>
</template>

<script>
  // import { Message } from 'element-ui'
  import HighCharts from 'highcharts'
  import HighchartsDrilldown from 'highcharts/modules/drilldown.js'
  import HighchartsExporting from 'highcharts/modules/exporting.js'
  import HighchartsMore from 'highcharts/highcharts-more'
  // import Highcharts3D from 'highcharts/highcharts-3d'
  HighchartsMore(HighCharts)
  HighchartsDrilldown(HighCharts)
  HighchartsMore(HighCharts)
  HighchartsExporting(HighCharts)

  export default {
    data() {
      return {
        chart: null
      }
    },
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
    watch: {
      option() {
        HighCharts.chart(this.id, this.option)
      }
    },
    mounted() {
      this.chart = HighCharts.chart(this.id, this.option)
    },
    methods: {
    }
  }
</script>
<style lang="less">

</style>
<style scoped>


</style>
