<template>
  <div class="app-container">
	  <countTo :startVal='startVal' :endVal='endVal' :duration='1000'></countTo>
	  <el-button type="primary" @click="handleCreate">Add</el-button>
	  
	  <el-table :data="betList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
	          <span class="link-type" @click="handleInput(scope.row)">{{scope.row.title}}</span>
	        </template>
	    </el-table-column>
	    <el-table-column label="DateTime" >
	        <template slot-scope="scope">
	          {{scope.row.publicTime | dateFilter}}
	        </template>
	    </el-table-column>
	  </el-table>
	  
	  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    	<el-form ref="dataForm" :model="betInfo" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    		<el-form-item :label="'Username'">
    			<el-input v-model="betInfo.creator"></el-input>
    		</el-form-item>
    		<el-form-item :label="'内容'">
    			<el-input v-model="betInfo.title"></el-input>
    		</el-form-item>
    		<el-form-item :label="'公开时间'">
    			<el-date-picker v-model="betInfo.publicTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
    			</el-date-picker>
    		</el-form-item>
    	</el-form>
    	<div slot="footer" class="dialog-footer">
        	<el-button @click="dialogFormVisible = false">取消</el-button>
        	<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
      	</div>
    </el-dialog>
    
    <el-dialog title="Input" :visible.sync="dialogInputVisible">
    	<div class="filter-container">
        	<el-button type="primary" @click="inputBetData">确认</el-button>
      	</div>
    	<el-form ref="dataForm" :model="betInput" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    		<el-form-item :label="'Username'">
    			<el-input v-model="betInput.username"></el-input>
    		</el-form-item>
    	</el-form>
    	<el-form ref="dataForm" :model="betInfo" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    		<el-form-item :label="'内容'">
    			<el-input v-model="betInfo.title" disabled></el-input>
    		</el-form-item>
    	</el-form>
    	<el-form ref="dataForm" :model="betInfo" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    		<el-form-item :label="'公开时间'">
    			<el-date-picker v-model="betInfo.publicTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" disabled>
    			</el-date-picker>
    		</el-form-item>
    	</el-form>
    	<el-form ref="dataForm" :model="betInput" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    		<el-form-item :label="'Data'">
    			<el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="betInput.data">
          		</el-input>
    		</el-form-item>
    	</el-form>
    	<div slot="footer" class="dialog-footer">
        	<el-button @click="dialogInputVisible = false">取消</el-button>
        	<el-button v-if="dialogStatus=='create'" type="primary" @click="inputBetData">确认</el-button>
      	</div>
      	
      	<el-table v-if="betResult" :data="betResult" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      		<el-table-column align="center" label='ID' width="95">
		        <template slot-scope="scope">
		          {{scope.$index}}
		        </template>
		    </el-table-column>
		    <el-table-column label="User" >
		        <template slot-scope="scope">
		          {{scope.row.username}}
		        </template>
		    </el-table-column>
		    <el-table-column label="Data" >
		        <template slot-scope="scope">
		          {{scope.row.data}}
		        </template>
		    </el-table-column>
      	</el-table>
      	
    </el-dialog>
  </div>
</template>

<script>
import countTo from '@/components/CountTo/vue-countTo'
import {createBet, listBet, inputBet, queryBet} from '@/api/bet'

export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2018,
      listLoading: true,
      dialogStatus: 'create',
      dialogFormVisible: false,
      dialogInputVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      betInfo: {
      	title:null,
      	creator:null,
      	publicTime:null
      },
      betInput: {
      	bid:null,
      	username:null
      },
      betList:null,
      betResult:null
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
    //console.log(countTo);
    this.loadAllBet();
  },
  methods: {
  	cleanBet() {
  		this.betInfo ={
	      	title:null,
	      	creator:null,
	      	publicTime:null
	      }
  	},
  	loadAllBet() {
  		var that = this
  		that.listLoading = true
  		listBet().then(response => {	        
	        that.listLoading = false
	        that.betList = response
	    }).catch(function (error) {
		    that.listLoading = false
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
   		this.cleanBet();
   		this.dialogFormVisible = true
   	},
   	handleInput(row) {
   		this.dialogInputVisible = true
   		this.betInfo = Object.assign({}, row) // copy obj
   		this.loadResult(row.id);
   	},
   	createData() {
   		var that = this
   		that.listLoading = true
   		var data = that.betInfo
   		createBet(data).then(response => {	        
	        that.listLoading = false
	        that.dialogFormVisible = false
	    }).catch(function (error) {
		    that.listLoading = false
		})
   	},
   	inputBetData() {
   		var that = this
   		that.listLoading = true
   		that.betInput.bid = that.betInfo.id
   		var data = that.betInput
   		inputBet(data).then(response => {	        
	        that.listLoading = false
	        that.dialogInputVisible = false
	    }).catch(function (error) {
		    that.listLoading = false
		})
   	}
  }
}
</script>
