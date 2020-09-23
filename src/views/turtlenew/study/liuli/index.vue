<template>
  <div class="app-container">
    <h3>流利英语</h3>

    <el-table v-if="table.data != null" :data="table.data" style="width:100%"
              v-loading.body="table.loading"
              @row-click="selectRow">
      <el-table-column  label="日期" prop="datetime" ></el-table-column>
      <el-table-column  label="标题" prop="title" ></el-table-column>
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
    props: {
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: []
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
      }
    },
    components: {
    },
    computed: {
    },
    created() {
      this.refresh()
    },
    methods: {
      refresh() {
        this.doFilter()
      },
      doFilter() {
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
