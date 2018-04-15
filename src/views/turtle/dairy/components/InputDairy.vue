<template>
  <div class="app-container">
  	 <h3>{{ p_action | actionFilter }}</h3>
  	 <div class="filter-container">
	      <el-select v-if="showUserFilter" clearable style="width: 150px" class="filter-item" v-model="listQuery.creator" placeholder="Username">
	      	<el-option v-for="item in userOptions" :key="item" :label="item" :value="item">
	        </el-option>
	      </el-select>
	      
	      <el-select v-if="showTypeFilter" clearable style="width: 150px" class="filter-item" v-model="listQuery.type" @change="handleChangeType">
	        <el-option v-for="item in typeOptions" :key="item" :label="item | typeFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select v-if="showTypeFilter && listQuery.type >= 0 && listQuery.type < 99" clearable class="filter-item" style="width: 180px" v-model="listQuery.subtype">
	        <el-option v-for="item in subtypeOptions[listQuery.type]" :key="item" :label="item | subtypeFilter" :value="item">
	        </el-option>
	      </el-select>
	      <!--
		  <el-input v-if="showTitleFilter" clearable style="width: 200px;" class="filter-item" placeholder="Title" v-model="listQuery.title">
	      </el-input>
		  -->
	  </div>
	  
	<MDinput name="name" v-model="listQuery.title" required :maxlength="100">Title</MDinput>
	
	<div style="margin:10px auto">
		<tinymce :height="300" v-model="listQuery.content"></tinymce>
   		<el-button v-if="p_action=='edit'" type="primary" @click="onEditDairy">确定修改</el-button>
   		<el-button v-else="p_action=='create'" type="primary" @click="onClickBtn">确定</el-button>
   	</div>
   	<!--<div class="editor-content" v-html="listQuery.content"></div>-->
     
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Tinymce from '@/components/Tinymce'
import {createDairy, modifyDairy, listAllUsername} from '@/api/dairy'

export default {
  name: 'InputDairy',
  components: { Tinymce, MDinput },
  props: {
  	showUserFilter: {
  		type:Boolean,
  		default : true
  	},
  	showTypeFilter: {
  		type:Boolean,
  		default : true
  	},
  	showTitleFilter: {
  		type:Boolean,
  		default : true
  	},
  	creator : {
  		type : String
  	},
  	title : {
  		type : String
  	},
  	content : {
  		type : String
  	},
  	type : {
  		type : Number
  	},
  	subtype : {
  		type : Number
  	},
  	dairyid : {
  		type : Number
  	},
  	action : {
  		type : String,
  		default : 'create'
  	},
  	successCreateDirectTo : {
  	},
  	typeOptions : {
  		type : Array,
  		default : function() {return [99, 0, 1, 2]}
  	},
  	subtypeOptions : {
  		type : Object,
  		default : function() {
  		return {
    		0: [0, 1, 2],
    		1: [10, 11]
    	}}
  	}  	
  },
  data() {
    return {
    	listQuery : {
    		creator:'',
    		type:null,
    		subtype:null,
    		title:null
    	},
    	userOptions : ["Turtle", "DFS","WF"]
    }
  },
  filters: {
    typeFilter(val) {
    	const typeMap = {
    		99 : 'All',
    		0 : 'Codeforces',
    		1 : 'Normal',
    		2 : 'Dream'
    	}
    	var rs = typeMap[val]
    	//console.log(rs)
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
    },
    actionFilter(val) {
    	if (val == 'edit') {
    		return "Modify"
    	} else {
    		return 'Create'
    	}
    }
  },
  created() {
  	this.listQuery.creator = this.creator
   	this.listQuery.type = this.type
   	this.listQuery.subtype = this.subtype
   	this.listQuery.title = this.title
   	this.listQuery.content = this.content
   	this.listQuery.id = this.dairyid
   	//console.log(this.action)
   	this.p_action = this.action
   	//console.log("created:"+JSON.stringify(this.listQuery));
   	this.loadAllUser()
  },
  methods: {
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
  	 onClickBtn() {
  	 	var that = this
  	 	console.log(that.successCreateDirectTo)
  	 	console.log(JSON.stringify(this.listQuery));
  	 	createDairy(this.listQuery).then(response => {	        
	        that.listQuery.content = ""
	        var msg = response.message
	        if (msg == "OK") {
	        	that.$message({
				   message: '成功',
				   type: 'success'
				})
				this.$router.push({
		    		name : that.successCreateDirectTo
		    	})
	        } else {
	        	that.$message({
				   message: msg,
				   type: 'error'
				})
	        }
	    }).catch(function (error) {
		    that.$message({
			   message: '失败',
			   type: 'error'
			})
		})
  	 },
  	 onEditDairy() {
  	 	var that = this
  	 	console.log(that.successCreateDirectTo)
  	 	//console.log(JSON.stringify(this.listQuery));
  	 	if (!that.listQuery.id || that.listQuery.id <= 0) {
  	 		that.$message({
			   message: '失败! id不存在',
			   type: 'error'
			})
  	 		return
  	 	} 
  	 	modifyDairy(this.listQuery).then(response => {	        
	        that.listQuery.content = ""
	        var msg = response.message
	        if (msg == "OK") {
	        	that.$message({
				   message: '修改成功',
				   type: 'success'
				})
				this.$router.push({
		    		name : that.successCreateDirectTo
		    	})
	        } else {
	        	that.$message({
				   message: msg,
				   type: 'error'
				})
	        }
	    }).catch(function (error) {
		    that.$message({
			   message: '失败',
			   type: 'error'
			})
		})
  	 },
  	 handleChangeType(val) {
  	 	this.listQuery.subtype = null
  	 }
  	 
  }
}
</script>
