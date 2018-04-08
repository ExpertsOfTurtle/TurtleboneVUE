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
  name: 'vipBao',
  
  data() {
    return {
    	"title":"vipBao"
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

