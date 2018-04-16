<template>
  <div class="app-container">
  	 <h3>{{ p_action | actionFilter }}</h3>
  	 <!--<div class="filter-container">-->
  	 <el-form ref="dataForm" :model="listQuery" label-position="left" label-width="120px" style='width: 500px;'>
	    <el-form-item label="创建人">  
	      <el-select v-if="showUserFilter" clearable style="width: 300px" class="filter-item" v-model="listQuery.creator" placeholder="Username">
	      	<el-option v-for="item in userOptions" :key="item" :label="item" :value="item">
	        </el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="类型">  
	      <el-select v-if="showTypeFilter" clearable style="width: 150px" class="filter-item" v-model="listQuery.type" @change="handleChangeType">
	        <el-option v-for="item in typeOpts" :key="item" :label="item | typeFilter" :value="item">
	        </el-option>
	      </el-select>
	      <el-select v-if="showTypeFilter && listQuery.type >= 0 && listQuery.type < 99" clearable class="filter-item" style="width: 150px" v-model="listQuery.subtype">
	        <el-option v-for="item in subtypeOptions[listQuery.type]" :key="item" :label="item | subtypeFilter" :value="item">
	        </el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="状态">  
	   	  <el-select  clearable class="filter-item" style="width: 150px" v-model="listQuery.status">
	        <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item">
	        </el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="到期时间">  
	      <el-date-picker v-model="listQuery.expiretime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
    	  </el-date-picker>
	    </el-form-item>
	 </el-form>
	
	  
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
import { mapGetters } from 'vuex'
import MDinput from '@/components/MDinput'
import Tinymce from '@/components/Tinymce'
import {createDairy, modifyDairy, listAllUsername} from '@/api/dairy'
import {getDairyType, getDairyTypeDesp, getDairySubType, getDairySubTypeDesp, getDairyStatus, getDairyStatusDesp} from '@/api/dairyMapper'

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
  	status : {
  		type : Number
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
  	expTime : {
  		type : Number
  	},
  	action : {
  		type : String,
  		default : 'create'
  	},
  	successCreateDirectTo : {
  	},
  	defaultTypeOptions : {
  		type : Array
  	}
  },/*
  computed: {
    ...mapGetters([
      'typeOptions',
      'subtypeOptions'
    ])
  },*/
  data() {
    return {
    	listQuery : {
    		creator:'',
    		type:null,
    		subtype:null,
    		expiretime:null,
    		title:null,
    		status : null    		
    	},
    	subtypeOptions : null,
    	statusOptions : null,
    	typeOpts : null,
    	userOptions : ["Turtle", "DFS","WF"]
    }
  },
  filters: {
    typeFilter(val) {
    	return getDairyTypeDesp(val)
    },
    subtypeFilter(val) {
    	return getDairySubTypeDesp(val)
    },
    actionFilter(val) {
    	if (val == 'edit') {
    		return "Modify"
    	} else {
    		return 'Create'
    	}
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
  	this.subtypeOptions = getDairySubType()
  	this.listQuery.creator = this.creator
   	this.listQuery.type = this.type
   	this.listQuery.subtype = this.subtype
   	this.listQuery.title = this.title
   	this.listQuery.content = this.content
   	this.listQuery.status = this.status
   	this.listQuery.id = this.dairyid
   	this.listQuery.expiretime = new Date(this.expTime)
   	//console.log(this.action)
   	this.p_action = this.action
   	console.log("created:"+JSON.stringify(this.listQuery));
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
