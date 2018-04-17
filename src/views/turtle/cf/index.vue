<template>
  <div class="app-container">
	  <el-button type="primary" @click="handleCreate">创建罚题</el-button>
	  
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
	    <el-table-column label="Amount" >
	        <template slot-scope="scope">
	          {{scope.row.amount}}
	        </template>
	    </el-table-column>
	    <el-table-column label="Reason" >
	        <template slot-scope="scope">
	          <span class="link-type" @click="handleInput(scope.row)">{{scope.row.reason}}</span>
	        </template>
	    </el-table-column>
	    <el-table-column label="Deadline" >
	        <template slot-scope="scope">
	          {{scope.row.deadline}}
	        </template>
	    </el-table-column>
	    <el-table-column label="CreateTime" >
	        <template slot-scope="scope">
	          {{scope.row.createtime | dateFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="UpdateTime" >
	        <template slot-scope="scope">
	          {{scope.row.updatetime | dateFilter}}
	        </template>
	    </el-table-column>
	  </el-table>
	  
	  <div class="pagination-container">
	      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
    
    <el-dialog title="Input" :visible.sync="dialogInputVisible">
    	<el-form ref="dataForm" :model="cfform" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    		<el-form-item :label="'Username'">
    			<el-select clearable style="width: 150px" class="filter-item" v-model="cfform.username" placeholder="姓名">
			      	<el-option v-for="item in userList" :key="item" :label="item" :value="item">
			        </el-option>
			    </el-select>
    		</el-form-item>
    		<el-form-item :label="'Amount'">
    			<el-input type="number" v-model="cfform.amount"></el-input>
    		</el-form-item>
    		<el-form-item :label="'Reason'">
    			<el-input v-model="cfform.reason"></el-input>
    		</el-form-item>
    		<el-form-item :label="'Deadline'">
    			<el-date-picker v-model="cfform.deadline" type="date" value-format="yyyyMMdd"  format="yyyy-MM-dd" placeholder="选择日期时间">
    			</el-date-picker>
    		</el-form-item>
    	</el-form>    	
    	<div slot="footer" class="dialog-footer">
        	<el-button @click="dialogInputVisible = false">取消</el-button>
        	<el-button v-if="dialogStatus=='create'" type="primary" @click="insertCFTask">确认</el-button>
        	<el-button v-if="dialogStatus=='view'" type="danger" @click="deleteCFTask">删除</el-button>
      	</div>
      	
    </el-dialog>
  </div>
</template>

<script>
import {listAllUsername, filter, createTask, deleteTask} from '@/api/cf'

export default {
  data() {
    return {
      listLoading: true,
      dialogStatus: 'create',
      dialogFormVisible: false,
      dialogInputVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      cfform: {
      	username:null,
      	amount:null,
      	reason:null,
      	deadline:null
      },
      userList :["DFS", "WF"],
      deadline:null,
      total:null,
      list:null,
      listQuery: {
        page: 1,
        limit: 5,
        ipList:null
      },
      myapp:null
    }
  },
  filters: {
    dateFilter(val) {
    	var d = new Date()
    	var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = val + 0;
        var date = new Date(utcTime + 3600000 * 8);
        return date.toUTCString()
    }
  },
  created() {
  	this.myapp = this;
    //console.log(countTo);
    this.getList();
    this.loadAllUser()
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
  	loadAllUser() {
  	 	listAllUsername().then(response => {	        
	        this.userList = response
	    }).catch(function (error) {
		    that.$message({
			   message: '失败',
			   type: 'error'
			})
		})
  	 },
  	getList() {
  		var that = this
  		that.listLoading = true
  		var data = {
  			pageNumber:that.listQuery.page-1,
	      	pageSize:that.listQuery.limit,
	      	status : 0
  		}
  		filter(data).then(response => {	        
	        that.listLoading = false
	        that.total = response.total
	        console.log("Total:" + that.total);
	        if (that.total > 0) {
	        	that.list = response.list
	        }
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
   	handleCreate() {
   		this.cleanTask();
   		this.dialogInputVisible = true
   		this.dialogStatus = 'create'
   	},
   	handleInput(row) {
   		this.dialogInputVisible = true
   		this.cfform = Object.assign({}, row) // copy obj
   		this.dialogStatus = 'view'
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
   		var msg = '你成功惩罚了' + that.cfform.username
   		createTask(data).then(response => {	   
   			that.listLoading = false
	        that.dialogInputVisible = false
	        if (response == "OK"){
	   			that.$message({
			       message: msg,
			       type: 'success'
			    })
			} else {
				that.$message({
			       message: response,
			       type: 'error'
			    })
			}
	        that.getList();
	    }).catch(function (error) {
	    	console.log("Fail");
	    	var msg = '不知道为什么失败了'
   			that.$message({
		       message: msg,
		       type: 'error'
		    })
		    that.listLoading = false
		})
   	},
   	deleteCFTask(){
   		var that = this
    	this.$confirm('想清楚要删除罚题吗?', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.processDeleteCFTask()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
   	processDeleteCFTask(){
   		var that = this
   		var id = this.cfform.id
   		deleteTask(id).then(response => {	   
   			that.listLoading = false
	        that.dialogInputVisible = false
	        that.getList();
	        if (response == "1"){
	        	that.$message({
			       message: '成功解除对 ' + that.cfform.username + ' 的惩罚' + that.cfform.amount + ' 题',
			       type: 'success'
			    })
	        } else {
	        	that.$message({
			       message: response,
			       type: 'error'
			    })
			}
	    }).catch(function (error) {
	    	console.log("Fail");
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
   	}
  }
}
</script>
