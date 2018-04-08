<template>
  <div class="components-container">
    <el-row>
      <el-col :span="24">
        <p>{{ title }}</p>
      </el-col>
    </el-row>
	<el-row>
      <el-col :span="16">
        <el-button type="primary">OK</el-button>
      </el-col>
    </el-row>
    
  </div>

</template>
       
<script>


export default {
  name: 'onehundred',
  
  data() {
    return {
    	"title":"100种物品"
     }
  },
  mounted() {
    
  },
  methods: {
    stopDefault(e){
      e.preventDefault()
    }
  }
}
</script>

<style>
  
</style>

