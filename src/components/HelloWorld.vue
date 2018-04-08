<template>
  <div class="hello">

    <div class="left-menu">
	    <el-row class="tac">
	  <el-col :span="24">
	    <h5></h5>
	    <el-menu 
	      default-active="2"
	      class="el-menu-vertical-demo"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="#545c64"
	      text-color="#fff"
	      active-text-color="#ffd04b">
	      <el-submenu index="1">
	        <template slot="title">
	          <i class="el-icon-location"></i>
	          <span>导航一</span>
	        </template>
	        <el-menu-item-group>
	          <template slot="title">分组一</template>
	          <el-menu-item index="1-1">选项1</el-menu-item>
	          <el-menu-item index="1-2">选项2</el-menu-item>
	        </el-menu-item-group>
	        <el-menu-item-group title="分组2">
	          <el-menu-item index="1-3">选项3</el-menu-item>
	        </el-menu-item-group>
	        <el-submenu index="1-4">
	          <template slot="title">选项4</template>
	          <el-menu-item index="1-4-1">选项1</el-menu-item>
	        </el-submenu>
	      </el-submenu>
	      <el-menu-item index="2">
	        <i class="el-icon-menu"></i>
	        <span slot="title">导航二</span>
	      </el-menu-item>
	      <el-menu-item index="3" disabled>
	        <i class="el-icon-document"></i>
	        <span slot="title">导航三</span>
	      </el-menu-item>
	      <el-menu-item index="4">
	        <i class="el-icon-setting"></i>
	        <span slot="title">导航四</span>
	      </el-menu-item>
	    </el-menu>
	  </el-col>
	</el-row>
	</div>
	
	<div class="main">
		<el-button>默认按钮</el-button>  
	    <el-button type="primary">主要按钮</el-button>  
	    <el-button type="text">文字按钮</el-button>
	    <p>sdf</p>
	    <div style="height:600px;margin:10px;"></div>
	</div>

	      
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.left-menu {
	height:100%;
	width:40%;
	float:left;
}
.main {
	height:100%;
	width:55%;
	margin:10px 0 0 20px;
	border:1px solid green;
	float:left;
}
</style>
