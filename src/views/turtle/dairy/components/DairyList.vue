<template>
  <div class="app-container">
	  <div class="filter-container">
	     <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.creator" placeholder="Username">
	      	<el-option v-for="item in userOptions" :key="item" :label="item" :value="item">
	        </el-option>
	      </el-select>
	      <el-select style="width: 150px" class="filter-item" v-model="listQuery.type" @change="handleChangeType">
	        <el-option v-for="item in typeOptions" :key="item" :label="item | typeFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select v-if="listQuery.type >= 0 && listQuery.type < 99" clearable class="filter-item" style="width: 180px" v-model="listQuery.subtype">
	        <el-option v-for="item in subtypeOptions[listQuery.type]" :key="item" :label="item | subtypeFilter" :value="item">
	        </el-option>
	      </el-select>
		  <el-input clearable style="width: 200px;" class="filter-item" placeholder="Title" v-model="listQuery.title">
	      </el-input>
	      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
	  </div>
	  
	  <el-table v-if="list != null" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
	  	<el-table-column align="center" label='ID' width="95">
	        <template slot-scope="scope">
	          {{scope.$index}}
	        </template>
	    </el-table-column>
	    <el-table-column label="Creator" >
	        <template slot-scope="scope">
	          {{scope.row.creator}}
	        </template>
	    </el-table-column>
	    <el-table-column label="Title" >
	        <template slot-scope="scope">
	          <span class="link-type" @click="handleReadDetail(scope.row)">{{scope.row.title}}</span>
	        </template>
	    </el-table-column>
	    <el-table-column label="Type" >
	        <template slot-scope="scope">
	          {{scope.row.type | typeFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="Sub type" >
	        <template slot-scope="scope">
	          {{scope.row.subtype | subtypeFilter}}
	        </template>
	    </el-table-column>
	    <el-table-column label="Create Time" >
	        <template slot-scope="scope">
	          {{scope.row.createtime | timeFilter}}
	        </template>
	    </el-table-column>
	  </el-table>
	  
	  <div class="pagination-container">
	    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
	    </el-pagination>
	  </div>
	  
	  <el-dialog title="内容"  :visible.sync="dialogDetailVisible">
	  	<div class="editor-content" v-html="detail.content"></div>
	  	<el-button class="filter-item" type="primary" @click="handleEdit">修改</el-button>
	  	<el-button class="filter-item" type="danger" @click="handleDelete">删除</el-button>
	  </el-dialog>
  </div>
</template>

<script>
import {filter, createDairy, deleteDairy, modifyDairy} from '@/api/dairy'

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
  	}
  },
  data() {
    return {
    	dialogDetailVisible : false,
    	listLoading : false,
    	userOptions : ["DFS","WF"],
    	typeOptions : [99, 0, 1, 2],
    	subtypeOptions : {
    		0: [0, 1, 2],
    		1: [10, 11]
    	},
    	listQuery : {
    		creator:null,
    		type:null,
    		subtype:null,
    		title:null,
    		page: 1,
        	limit: 5
    	},
    	total : null,
    	list : null,
    	detail : {
    	}
    }
  },
  filters: {
    timeFilter(val) {
    	var d = new Date()
    	var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = val + 0;
        var date = new Date(utcTime + 3600000 * 8);
        return date.toUTCString()
    },
    typeFilter(val) {
    	const typeMap = {
    		99 : 'All',
    		0 : 'Codeforces',
    		1 : 'Normal',
    		2 : 'Dream'
    	}
    	var rs = typeMap[val]
    	return rs
    },
    subtypeFilter(val) {
    	const typeMap = {
    		0 : '翻译',
    		1 : '收藏',
    		2 : '题解',
    		10 : '想法',
    		11 : '学习'
    	}
    	return typeMap[val]
    }
  },
  created() {
  	//console.log(this.defaultQuery)
   	this.listQuery = Object.assign(this.listQuery, this.defaultQuery)
   	this.getList()
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
  	 handleSearch() {
  	 	console.log(JSON.stringify(this.listQuery));
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
    	var param = Object.assign({action : 'edit'}, this.detail)
    	param.dairyid = param.id
    //	console.log(JSON.stringify(param));
    	this.$router.push({
    		//path : '/Codeforces/translate',
    		name : 'Translate',
    		params : param
    	})
    },
    handleDelete() {
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
    	
    }
  }
}
</script>
