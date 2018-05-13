<template>
  <div class="app-container">
	  <div class="filter-container">
	     <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.creator" placeholder="创建人">
	      	<el-option v-for="item in userOptions" :key="item" :label="item" :value="item">
	        </el-option>
	      </el-select>
	      <el-input clearable style="width: 200px;" class="filter-item" v-model="listQuery.title"  placeholder="标题">
	      </el-input>
	      <el-select style="width: 150px" class="filter-item" v-model="listQuery.type" @change="handleChangeType" placeholder="类型">
	        <el-option v-for="item in typeOpts" :key="item" :label="item | typeFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select v-if="listQuery.type >= 0 && listQuery.type < 99" clearable class="filter-item" 
	      style="width: 180px" v-model="listQuery.subtype"  placeholder="子类型">
	        <el-option v-for="item in subtypeOptions[listQuery.type]" :key="item" :label="item | subtypeFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select class="filter-item" style="width: 180px" v-model="listQuery.checkExpire">
	        <el-option label="校验Expire" value="Y">
	        </el-option>
	        <el-option  label="不校验Expire" value="N">
	        </el-option>
	      </el-select>
	      <el-select class="filter-item" style="width: 180px" v-model="listQuery.status" placeholder="状态">
	        <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item" >
	        </el-option>
	      </el-select>
		  
	      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
	  </div>
	  
	  <el-table v-if="list != null" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
	  	<el-table-column align="center" label='ID' width="95">
	        <template slot-scope="scope">
	          {{scope.$index}}
	        </template>
	    </el-table-column>
	    <el-table-column label="创建人" >
	        <template slot-scope="scope">
	          {{scope.row.creator}}
	        </template>
	    </el-table-column>
	    <el-table-column label="标题" >
	        <template slot-scope="scope">
	          <span class="link-type" @click="handleReadDetail(scope.row)">{{scope.row.title}}</span>
	        </template>
	    </el-table-column>
	    <el-table-column label="类型" >
	        <template slot-scope="scope">
	          {{scope.row.type | typeFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="子类型" >
	        <template slot-scope="scope">
	          {{scope.row.subtype | subtypeFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="状态" >
	        <template slot-scope="scope">
	          {{scope.row.status | statusFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="最后更新" >
	        <template slot-scope="scope">
	          {{scope.row.updatetime | timeFilterWithDesp}}
	        </template>
	    </el-table-column>
	    <el-table-column label="创建时间" >
	        <template slot-scope="scope">
	          {{scope.row.createtime | timeFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="过期时间" >
	    	<template slot-scope="scope">
	    		 {{scope.row.expiretime | timeFilter}}
    	    </template>
	    </el-table-column>
	  </el-table>
	  
	  <div class="pagination-container">
	    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
	    </el-pagination>
	  </div>
	  
	  <el-dialog :title="detail.title"  :visible.sync="dialogDetailVisible">
	  	<span>Author:  {{detail.creator}} <b v-if="detail.expiretime" style="float:right">Expired Date : {{ detail.expiretime | timeFilter }}</b></span>
	 	<hr>
	  	<div class="editor-content" v-html="detail.content"></div>
	  	<el-button class="filter-item" type="primary" @click="handleEdit">修改</el-button>
	  	<el-button v-if="detail.status == 0" class="filter-item" type="danger" @click="handleDelete">删除</el-button>
	  </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {filter, createDairy, deleteDairy, modifyDairy, listAllUsername} from '@/api/dairy'
import {formatDate} from '@/utils/date.js'
import {getDairyType, getDairyTypeDesp, getDairySubType, getDairySubTypeDesp, getDairyStatus, getDairyStatusDesp} from '@/api/dairyMapper'

export default {
  name: 'DairyList',
  props: {
  	defaultQuery : {
  		type: Object,
  		default : function() {
  			return {
  				creator:null,
	    		type:null,
	    		subtype:null,
	    		title:null
  			}
  		}
  	},
  	editDirectTo : {
  		type : String
  	},
  	defaultTypeOptions : {
  		type : Array
  	}
  },
  computed: {
    ...mapGetters([
      'typeOptions',
      'subtypeOptions'
    ])
  },
  data() {
    return {
    	dialogDetailVisible : false,
    	listLoading : false,
    	userOptions : ["DFS","WF"],
    	listQuery : {
    		creator:null,
    		type:null,
    		subtype:null,
    		title:null,
    		checkExpire : 'Y',
    		status : 0,
    		page: 1,
        	limit: 10
    	},
    	statusOptions : null,
    	typeOpts : null,
    	total : null,
    	list : null,
    	detail : {
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
    timeFilterWithDesp(val) {
    	if (val) {
    		var timestamp = (new Date()).valueOf()
    		var dif = timestamp - val
    		var difDay = parseInt(dif / 1000 / 3600 / 24)
    		var difHour = parseInt(dif / 1000 / 3600)
    		var difMinute = parseInt(dif / 1000 / 60)
    		var desp = ""
    		if (difDay > 0) {
    			//desp = '(' + difDay + ' 日之前)'
    		} else if (difHour > 0){
    			desp = '(' + difHour + ' 小时之前)'
    		} else  {
    			desp = '(' + difMinute + ' 分钟之前)'
    		}
    		var txt = formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss') + desp
    		return txt
    	} else {
    		return ''
    	}
    },
    typeFilter(val) {
    	return getDairyTypeDesp(val)
    },
    subtypeFilter(val) {
    	return getDairySubTypeDesp(val)
    },
    statusFilter(val) {
    	return getDairyStatusDesp(val)
    }
  },
  created() {
  	if (this.defaultTypeOptions) {
  		this.typeOpts = this.defaultTypeOptions
  	} else {
  		this.typeOpts = getDairyType()
  	}
	this.statusOptions = getDairyStatus()
   	this.listQuery = Object.assign(this.listQuery, this.defaultQuery)
   	this.getList()
   	this.loadAllUser()
  },
  methods: {
  	 getList() {
  		var that = this
  		that.listLoading = true
  		var param = {
  			pageNumber:that.listQuery.page-1,
	      	pageSize:that.listQuery.limit,
  		}
  		var data = Object.assign(param, this.listQuery)
  		if (data.type == 99) {
  			data.type = null
  			data.subtype = null
  		}
  		filter(data).then(response => {	        
	        that.listLoading = false
	        that.total = response.total
	        that.list = response.list
	    }).catch(function (error) {
		    that.listLoading = false
		    that.total = 0
		    that.list = null
		})
  	},
  	loadAllUser() {
  	 	listAllUsername().then(response => {	        
	        this.userOptions = response
	    }).catch(function (error) {
		    that.$message({
			   message: '失败',
			   type: 'error'
			})
		})
  	 },
  	 handleSearch() {
  	 	//console.log(JSON.stringify(this.listQuery));
  	 	this.getList()
  	 },
  	 handleReadDetail(row) {
  	 	this.dialogDetailVisible = true
   		this.detail = Object.assign({}, row) // copy obj
   		//this.dialogStatus = 'view'
  	 },
  	 handleChangeType(val) {
  	 	this.listQuery.subtype = null
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
    handleEdit () {
    	var that = this
    	var param = Object.assign({action : 'edit'}, this.detail)
    	param.dairyid = param.id
    	param.expTime = param.expiretime
    	console.log(JSON.stringify(param));
    	this.$router.push({
    		//path : '/Codeforces/translate',
    		name : that.editDirectTo,
    		params : param
    	})
    },
    processDelete(){
    	var that = this
    	var id = this.detail.id
    	deleteDairy(id).then(response => {	        
	        that.$message({
				message: '成功',
				type: 'success'
			})
			this.dialogDetailVisible = false
			that.getList()
	    }).catch(function (error) {
		    that.$message({
				message: '失败',
				type: 'error'
			})
		})
    },
    handleDelete() {
    	var that = this
    	this.$confirm('想清楚要删除吗?', '严重提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.processDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    	
    	
    }
  }
}
</script>
