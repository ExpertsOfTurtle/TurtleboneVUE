<template>
  <div class="app-container">
    <h3>理财大学 - 董小姐</h3>

    <el-table v-if="table.data != null" :data="table.data" style="width:100%"
              v-loading.body="table.loading">
      <el-table-column  label="日期" prop="up_time" ></el-table-column>
      <el-table-column  label="标题" >
        <template slot-scope="scope">
          <span class="link-type" @click="onShowDetails(scope.row.content_id)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="details.title" :visible.sync="dialog.showDetailsDialog">
      <audio controls="controls" ref="audio" :src="BASEURL + details.url">
      </audio>
      <div ref="detailsDiv"></div>
    </el-dialog>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { formatDate } from '@/utils/date.js'
  import { querySummary, queryDetails } from '@/api/study/dxj'

  export default {
    props: {
    },
    data() {
      return {
        BASEURL: '',
        table: {
          loading: false,
          data: []
        },
        details: {},
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
      this.BASEURL = process.env.BASE_API
      this.refresh()
    },
    methods: {
      refresh() {
        this.doFilter()
      },
      onShowDetails(contentId) {
        const that = this
        that.dialog.showDetailsDialog = true
        queryDetails(contentId).then(function(response) {
          that.details = response.response.data
          that.$refs.detailsDiv.innerHTML = that.details.content
          Message.success('success! id=' + that.details.id)
          that.$refs.audio.pause()
        }).catch(function(err) {
          console.error(err.toString())
        })
      },
      doFilter() {
        const that = this
        querySummary().then(function(response) {
          that.table.data = response.response.data
          Message.success(response.response.page.total)
        }).catch(function(err) {
          console.error(err.toString())
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
