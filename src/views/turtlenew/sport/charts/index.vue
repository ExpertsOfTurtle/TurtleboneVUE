<template>
  <div class="app-container">
    <h3>Sport</h3>
    <div class="form-row">
      <el-row :gutter="4">
        <el-col :span="10">
          <el-date-picker
            v-model='filter.timeRange'
            type='daterange'
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format='yyyy-MM-dd'
            @change="changeMyDateRange"
          >
          </el-date-picker>
        </el-col>

        <el-col :span="10">
          <label>User</label>
          <el-select id="username" class="filter-item" v-model="filter.username" placeholder="Please select" @change="changeUsername">
            <el-option value="DFS">DFS</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <label>Type</label>
          <el-select id="username" class="filter-item" v-model="filter.type" placeholder="Please select" @change="changeType">
            <el-option value="all">全部</el-option>
            <el-option value="running">跑步</el-option>
            <el-option value="hiking">户外行走</el-option>
            <el-option value="steps">步数</el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="refresh" >Refresh</el-button>
        </el-col>
      </el-row>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="graph">
        <!-- 千行代码bug数统计  -->
        <el-row :gutter="4">
          <el-col :span="24">
            <el-select class="filter-item" v-model="filter.sumByType" @change="refresh()" >
              <el-option value="DAY">DAY</el-option>
              <el-option value="WEEK">WEEK</el-option>
              <el-option value='MONTH'>MONTH</el-option>
              <el-option value='YEAR'>YEAR</el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <x-chart id="bugLine" class="high" :option="buildOption" ref="sportChart"  v-loading.body="chart.loading"></x-chart>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="table">
        正在开发中
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { formatDate } from '@/utils/date.js'
  import XChart from '@/components/Highcharts/basic'
  import { getColumnDoubleOption } from '@/highcharts/report/columnDouble/option'
  import { groupData } from '@/api/sport/sportApi'

  export default {
    name: 'sport',
    props: {
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: []
        },
        filter: {
          timeRange: ['2019-08-01', '2020-12-31'],
          username: '',
          type: 'running',
          pageNumber: 1,
          pageSize: 1000,
          fieldName: 'datetime',
          direction: 'asc',
          sumByType: 'DAY'
        },
        chart: {
          loading: false,
          data: null
        }
      }
    },
    filters: {
      timeFilter(val) {
        if (val) {
          return formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
        } else {
          return ''
        }
      }
    },
    components: {
      XChart
    },
    computed: {
      buildOption: function() {
        return this.buildCodeCountOption()
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      refresh(from, to) {
        this.getData()
      },
      getData() {
        const that = this
        console.log(that.filter)
        const param = {
          timeRange: {
            left: that.filter.timeRange ? that.filter.timeRange[0] + ' 00:00:00' : null,
            right: that.filter.timeRange ? that.filter.timeRange[1] + ' 23:59:59' : null
          },
          type: that.filter.type,
          pageNumber: 0,
          pageSize: 1000,
          fieldName: 'datetime',
          direction: 'desc',
          sumByType: that.filter.sumByType
        }
        console.log(param)
        groupData(param).then(function(resp) {
          that.chart.data = resp
        }).catch(function(err) {
          Message.error(err)
        })
      },
      getTimeString(second) {
        let str = ''
        let val = second
        if (val > 60) {
          str += parseInt(val / 60) + '分'
          val = val % 60
        }
        str += parseInt(val) + '秒'
        return str
      },
      getMinMax(arr) {
        if (arr == null || arr.length === 0) {
          return {}
        }
        let min = arr[0]
        let max = arr[0]
        for (const idx in arr) {
          if (arr[idx] < min) {
            min = arr[idx]
          }
          if (arr[idx] > max) {
            max = arr[idx]
          }
        }
        return { min: min, max: max }
      },
      buildCodeCountOption() {
        const that = this
        const categories = []
        const map = that.chart.data
        const subTitle = '(' + that.filter.timeRange[0] + '到' + that.filter.timeRange[1] + ')'
        const data_distince = []
        const data_useTime = []
        const data_steps = []
        const data_speed = []
        for (const key in map) {
          const list = map[key]['default']
          if (!list) {
            // data_distince.push(0)
            // data_useTime.push(0)
            // data_steps.push(0)
            // data_speed.push(0)
            // categories.push(key.substr(0, 10))
          } else {
            categories.push(key.substr(0, 10))
            let distance = 0
            let useTime = 0
            let steps = 0
            for (const idx in list) {
              distance += list[idx].distance
              useTime += list[idx].useTime
              steps += list[idx].steps
            }
            data_distince.push(distance)
            data_useTime.push(useTime)
            data_steps.push(steps)
            data_speed.push(useTime / distance * 1000)
          }
        }
        const series = []
        if (that.filter.type !== 'steps') {
          series.push({
            name: '距离',
            type: 'column',
            data: data_distince,
            yAxis: 0
          })
          series.push({
            name: '用时',
            type: 'column',
            data: data_useTime,
            yAxis: 1,
            dataLabels: {
              enabled: true,
              formatter: function() {
                return that.getTimeString(this.y)
              }
            }
          })
          series.push({
            name: '配速',
            type: 'spline',
            data: data_speed,
            yAxis: 3,
            dataLabels: {
              enabled: true,
              formatter: function() {
                return that.getTimeString(this.y)
              }
            }
          })
          series.push({
            name: '步数',
            type: 'column',
            data: data_steps,
            yAxis: 2
          })
        } else {
          series.push({
            name: '步数',
            type: 'column',
            data: data_steps
          })
        }
        const option = getColumnDoubleOption('Sport', subTitle, categories, series, 'SportSummary', 'xx')
        // 多个坐标轴，分别是距离、用时、步数
        let min, max;
        ({ min, max } = that.getMinMax(data_distince))
        min = parseInt(min * 0.8) / 100 * 100
        max = parseInt(max * 1.2) / 100 * 100
        if (min > 1000) min = 1000
        if (max < 6000) max = 6000
        const yAxis_distance = {
          title: {
            text: '距离(米)'
          },
          min: min,
          max: max
        };
        ({ min, max } = that.getMinMax(data_useTime))
        min = parseInt(min * 0.8) / 100 * 100
        max = parseInt(max * 1.2) / 100 * 100
        if (min > 500) min = 500
        if (max < 1200) max = 1200
        const yAxis_useTime = {
          title: {
            text: '用时(秒)'
          },
          min: min,
          max: max,
          stackLabels: {
            enabled: true,
            formatter: function() {
              return this.total
            }
          },
          opposite: true
        }
        const yAxis_steps = {
          title: {
            text: '步数'
          }
        };
        ({ min, max } = that.getMinMax(data_speed))
        min = parseInt(min * 0.8) / 100 * 100
        max = parseInt(max * 1.2) / 100 * 100
        if (min > 200) min = 200
        if (max < 400) max = 400
        const yAxis_speed = {
          title: {
            text: '配速'
          },
          min: min,
          max: max,
          opposite: true
        }
        if (that.filter.type !== 'steps') {
          option.yAxis = [yAxis_distance, yAxis_useTime, yAxis_steps, yAxis_speed]
        } else {
          option.yAxis = [yAxis_steps]
        }
        option.tooltip = {
          formatter: function() {
            let s = '<b>' + this.x + '</b>'
            this.points.forEach((item) => {
              s += '<br/>' + item.series.name + ': '
              if (item.series.name === '用时' || item.series.name === '配速') {
                s += that.getTimeString(item.y)
              } else {
                s += item.y
              }
            })
            return s
          },
          shared: true
        }
        return option
      },
      buildDistanceSeries() {

      },
      changeMyDateRange(e) {
        Message.info(e)
      },
      changeUsername(e) {
        Message.info(e)
      },
      changeType(e) {
        Message.info(e)
        this.refresh()
      }
    }
  }
</script>
<style lang="less">
  .el-row {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 30;
    }
  }
  .form-row{
    padding-top:10px;
  }
  .form-row label {
    padding-top:3px;
  }
  .tableHead {
    padding-bottom:20px;
  }
</style>
<style scoped>


</style>
