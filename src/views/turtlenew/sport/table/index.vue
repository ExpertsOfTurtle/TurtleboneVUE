<template>
  <div class="app-container">
    <h3>Table</h3>
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

    <el-table v-if="table.data != null" :data="table.data" style="width:100%"
              v-loading.body="table.loading"
              @row-click="selectRow">
      <el-table-column  label="日期" prop="datetime" ></el-table-column>
      <el-table-column label="星期" >
        <template slot-scope="scope">
          {{scope.row.dayOfWeek | filterDayOfWeek}}
        </template>
      </el-table-column>
      <el-table-column v-if="filter.type != 'steps'" label="距离" prop="distance" ></el-table-column>
      <el-table-column v-if="filter.type != 'steps'"  label="用时" prop="useTime" ></el-table-column>
      <el-table-column v-if="filter.type != 'running'" label="步数" prop="steps" ></el-table-column>
    </el-table>

    <el-dialog :title="'详细信息'" :visible.sync="dialog.showDetailsDialog">
      <img :src="dialog.trackWaterMark">
    </el-dialog>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { formatDate } from '@/utils/date.js'
  import { filterData } from '@/api/sport/sportApi'

  export default {
    name: 'sport-table',
    props: {
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: []
        },
        filter: {
          timeRange: ['2019-08-01', '2019-08-31'],
          username: '',
          type: 'running',
          pageNumber: 1,
          pageSize: 1000,
          fieldName: 'datetime',
          direction: 'asc'
        },
        table: {
          loading: false,
          data: []
        },
        dialog: {
          showDetailsDialog: false,
          trackWaterMark: null
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
      doFilter() {
        const that = this
        const param = {
          timeRange: {
            left: that.filter.timeRange ? that.filter.timeRange[0] + ' 00:00:00' : null,
            right: that.filter.timeRange ? that.filter.timeRange[1] + ' 23:59:59' : null
          },
          type: that.filter.type,
          pageNumber: 0,
          pageSize: 1000,
          fieldName: 'datetime',
          direction: 'desc'
        }
        filterData(param).then(function(resp) {
          that.table.data = resp
        }).catch(function(err) {
          Message.error(err)
        })
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
      },
      selectRow(row) {
        this.dialog.trackWaterMark = row.trackWaterMark
        if (row.trackWaterMark) {
          this.dialog.showDetailsDialog = true
        }
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
