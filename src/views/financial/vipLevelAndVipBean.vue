<template>
  <div class="components-container">
    <el-row>
      <el-col :span="10">
        <p>{{ title }}</p>
        <p>{{ title }} 1</p>
        <p>{{ title }} 2</p>
        <p>{{ title }} 3</p>
      </el-col>
    </el-row>

    
  </div>

</template>
       
<script>


export default {
  name: 'vipLevelAndVipBean',
  
  data() {
    return {
    	"title":"vipLevelAndVipBean"
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

