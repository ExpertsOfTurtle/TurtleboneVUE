<template>
  <div class="app-container">
    <h3>Table</h3>
    <div class="form-row">
      <el-row :gutter="4">
        <el-col :span="10">
          <el-date-picker
            v-model='sync.timeRange'
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
      </el-row>
      <el-row>
        <el-col :span="10">
          <label>Type</label>
          <el-select id="syncType" class="filter-item" v-model="sync.type" placeholder="Please select" >
            <el-option value="all">全部</el-option>
            <el-option value="running">跑步</el-option>
            <el-option value="hiking">户外行走</el-option>
            <el-option value="steps">步数</el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <label>DateUnit</label>
          <el-select id="syncDateUnit" class="filter-item" v-model="sync.dateUnit" placeholder="Please select" >
            <el-option value="all">全部</el-option>
            <el-option value="running">跑步</el-option>
            <el-option value="hiking">户外行走</el-option>
            <el-option value="steps">步数</el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="doSync" >开始同步</el-button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { formatDate } from '@/utils/date.js'
  import { syncData } from '@/api/sport/sportApi'

  export default {
    name: 'sport-table',
    props: {
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: []
        },
        sync: {
          type: 'running',
          dateUnit: 'all'
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
      },
      filterDayOfWeek(val) {
        const arr = ['', '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        return arr[val]
      }
    },
    components: {
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
      refresh() {
        this.doFilter()
      },
      doSync() {
        const that = this
        const param = {
          type: that.sync.type,
          dateUnit: that.sync.dateUnit
        }
        syncData(param).then(function(resp) {
          console.log(resp)
        }).catch(function(err) {
          Message.error(err)
        })
      }
    }
  }
</script>
<style lang="less">
  .el-row {
    margin-bottom:10px;
    &:last-child {
      margin-bottom: 0;
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
