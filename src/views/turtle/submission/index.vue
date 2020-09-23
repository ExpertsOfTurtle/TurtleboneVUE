<template>
  <div class="app-container">
	  <div class="filter-container">
	  	 <!-- <el-input clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="Username" v-model="listQuery.username">
	      </el-input>-->
	      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.username" placeholder="Username">
	      	<el-option v-for="item in userOptions" :key="item" :label="item | userFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.status" placeholder="Status">
	        <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select clearable class="filter-item" style="width: 180px" v-model="listQuery.result" placeholder="Result">
	        <el-option v-for="item in resultOptions" :key="item" :label="item" :value="item">
	        </el-option>
	      </el-select>
		  <el-input clearable type="number" style="width: 150px;" class="filter-item" placeholder="ContestId" v-model="listQuery.contestId">
	      </el-input>
	      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">{{$t('table.search')}}</el-button>
	      <el-button class="filter-item" type="primary" @click="syncData">同步数据</el-button>
	  </div>
	  <div class="filter-container">
	  	<el-button type="primary" @click="handleSendReport">发送报告</el-button>
	  </div>

	  <el-table v-if="list != null" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
	  	<el-table-column align="center" label='ID' width="95">
	        <template slot-scope="scope">
	          {{scope.$index}}
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

    <el-dialog title="Report" v-loading.body="reportLoading" :visible.sync="dialogReportVisible">
    	<el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
    		<el-form-item label="From">
    			<el-date-picker v-model="temp.from" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="From">
    			</el-date-picker>
    		</el-form-item>
    		<el-form-item label="To">
    			<el-date-picker v-model="temp.to" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="To">
    			</el-date-picker>
    		</el-form-item>
    		<el-form-item label="收件人">
    			<el-input v-model="temp.email"></el-input>
    		</el-form-item>
    	</el-form>
    	<div slot="footer" class="dialog-footer">
        	<el-button @click="dialogReportVisible = false">取消</el-button>
        	<el-button type="primary" @click="sendReport">确认</el-button>
      	</div>
    </el-dialog>
  </div>
</template>

<script>
import {filterSubmission, syncSubmission, sendWeeklyReport} from '@/api/cf'

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
      statusOptions:[-1,0,1],
      resultOptions:["OK","WRONG_ANSWER","MEMORY_LIMIT_EXCEEDED", "COMPILATION_ERROR","RUNTIME_ERROR","TIME_LIMIT_EXCEEDED"],
      userOptions:["scorpiowf","could1991"],
      cfform: {
      	username:null,
      	amount:null,
      	reason:null,
      	deadline:null
      },
      deadline:null,
      list:null,
      total:null,
      listQuery: {
        page: 1,
        limit: 10,
        username : null,
        status : null,
        result : null
      },
      temp:{
      	from:null,
      	to:null,
      	email:null
      }
    }
  },
  filters: {
    dateFilter(val) {
    	return formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
    	var d = new Date()
    	var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = val + 0;
        var date = new Date(utcTime + 3600000 * 8);
        return date.toUTCString()
    },
    statusFilter(val) {
    	if (val == -1) {
    		return 'All'
    	} else if (val == 0) {
    		return '未结算'
    	} else if (val == 1) {
    		return '已结算'
    	}
    },
    userFilter(val) {
    	const userMap ={
	      	'scorpiowf':"DFS",
	      	'could1991':"Could"
	      }
    	return userMap[val]
    }
  },
  created() {
    //console.log(countTo);
    this.getList();
  },
  methods: {
  	cleanTask() {
  		this.cfform = {
      	username:null,
      	amount:null,
      	reason:null,
      	deadline:null
      }
  	},
  	getList() {
  		var that = this
  		that.listLoading = true
  		var param = {
  			pageNumber:that.listQuery.page-1,
	      	pageSize:that.listQuery.limit
  		}
  		var data = Object.assign(param, this.listQuery)
  		filterSubmission(data).then(response => {
	        that.listLoading = false
	        that.list = response.list
	        that.total = response.total
	    }).catch(function (error) {
		    that.listLoading = false
		    that.total = 0
		    that.list = null
		})
  	},
  	loadResult(id) {
  		var that = this;
  		that.listLoading = true
  		queryBet(id).then(response => {
	        that.listLoading = false
	        if (typeof response == "string") {
	        	that.betResult = null
	        } else {
	        	that.betResult = response
	        }

	    }).catch(function (error) {
		    that.listLoading = false
		})
  	},
  	syncData() {
  		var that = this
  		that.listLoading = true
  		syncSubmission().then(response => {
	       that.getList()
	    }).catch(function (error) {
		    that.listLoading = false
		})
  	},
   	handleCreate() {
   		this.cleanTask();
   		this.dialogInputVisible = true
   	},
   	handleInput(row) {
   		this.dialogInputVisible = true
   		this.cfform = Object.assign({}, row) // copy obj

   	},
   	handleCurrentChange(val) {
    	this.listQuery.page = val
    	this.getList();
    },
    handleSizeChange(val) {
    	console.log("handleSizeChange=" + val);
      	this.listQuery.limit = val
      	this.listQuery.page = 1
      	this.getList();
    },
   	insertCFTask() {
   		if (!this.validateTask()) {
   			return
   		}
   		var that = this
   		that.listLoading = true
   		var data = that.cfform
   		createTask(data).then(response => {
	        that.listLoading = false
	        that.dialogFormVisible = false
	    }).catch(function (error) {
		    that.listLoading = false
		})
   	},
   	validateTask() {
   		var that = this
   		if (that.cfform.username == null) {
   			this.$message({
		       message: '你必须输入username',
		       type: 'error'
		    })
		    return false
   		}
   		if (that.cfform.amount == null) {
   			this.$message({
		       message: '你必须输入amount',
		       type: 'error'
		    })
		    return false
   		}
   		if (that.cfform.reason == null) {
   			this.$message({
		       message: '你必须输入reason',
		       type: 'error'
		    })
		    return false
   		}
   		console.log("good")
   		return true
   	},
   	handleSendReport() {
   		this.dialogReportVisible = true
   	},
   	sendReport() {
   		var that = this
   		var data = Object.assign({}, that.temp)
   		if (data.email == null || data.email == "") {
   			that.$message({
			   message: '你忘记填写email地址了',
			   type: 'error'
			})
			return
   		}

   		this.reportLoading = true
   		sendWeeklyReport(data).then(response => {
	        that.reportLoading = false
	        that.dialogReportVisible = false
	        that.$message({
			   message: '成功发送邮件！',
			   type: 'success'
			})
	    }).catch(function (error) {
		    that.listLoading = false
		    that.$message({
			   message: '失败',
			   type: 'error'
			})
		})
   	}
  }
}
</script>
