<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="Username" v-model="listQuery.username">
         </el-input>-->
      <el-select v-model="statusArr" multiple class1="filter-item" style1="width: 180px" placeholder="Result">
        <el-option v-for="item in resultOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input clearable type="number" style="width: 150px;" class="filter-item" placeholder="ContestId" v-model="listQuery.contestId">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary" @click="syncData">同步数据</el-button>
    </div>

    <el-table v-if="list != null" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="Username" >
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="Problem" >
        <template slot-scope="scope">
          {{scope.row.contestid}}{{scope.row.problemindex}}
        </template>
      </el-table-column>
      <el-table-column label="Tags" >
        <template slot-scope="scope">
          {{scope.row.tags}}
        </template>
      </el-table-column>
      <el-table-column label="Result" >
        <template slot-scope="scope">
          {{scope.row.result}}
        </template>
      </el-table-column>
      <el-table-column label="Submit Time" >
        <template slot-scope="scope">
          {{scope.row.submittime}}
        </template>
      </el-table-column>
      <el-table-column label="Rating" >
        <template slot-scope="scope">
          {{scope.row.rating}}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { filterSubmission, syncSubmission } from '@/api/codeforces'
  import { formatDate } from '@/utils/date.js'

  export default {
    data() {
      return {
        listLoading: true,
        dialogStatus: 'create',
        dialogFormVisible: false,
        dialogReportVisible: false,
        reportLoading: false,
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        statusOptions: [1, 0, 1],
        resultOptions: ['OK', 'WRONG_ANSWER', 'MEMORY_LIMIT_EXCEEDED', 'COMPILATION_ERROR', 'RUNTIME_ERROR', 'TIME_LIMIT_EXCEEDED'],
        userOptions: ['scorpiowf'],
        cfform: {
          username: null,
          amount: null,
          reason: null,
          deadline: null
        },
        deadline: null,
        list: null,
        total: null,
        listQuery: {
          page: 1,
          limit: 10,
          username: null,
          result: null
        },
        statusArr: [],
        temp: {
          from: null,
          to: null,
          email: null
        }
      }
    },
    filters: {
      dateFilter(val) {
        return formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
        // const d = new Date()
        // const offset = d.getTimezoneOffset() * 60000
        // 得到现在的格林尼治时间
        // var utcTime = val + 0
        // var date = new Date(utcTime + 3600000 * 8)
        // return date.toUTCString()
      },
      statusFilter(val) {
        if (val === -1) {
          return 'All'
        } else if (val === 0) {
          return '未结算'
        } else if (val === 1) {
          return '已结算'
        }
      },
      userFilter(val) {
        const userMap = {
          'scorpiowf': 'DFS'
        }
        return userMap[val]
      }
    },
    created() {
      // console.log(countTo);
      this.getList()
    },
    methods: {
      getList() {
        const that = this
        that.listLoading = true
        var param = {
          pageNumber: that.listQuery.page - 1,
          pageSize: that.listQuery.limit,
          status: that.statusArr
        }
        const data = Object.assign(param, this.listQuery)
        filterSubmission(data).then(response => {
          that.listLoading = false
          that.list = response.list
          that.total = response.total
        }).catch(function(err) {
          that.listLoading = false
          that.total = 0
          that.list = null
          console.log(err)
        })
      },
      syncData() {
        const that = this
        that.listLoading = true
        syncSubmission().then(response => {
          that.getList()
        }).catch(function(err) {
          that.listLoading = false
          console.log(err.toString())
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>
