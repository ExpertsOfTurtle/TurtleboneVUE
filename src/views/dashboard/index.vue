<template>
  <div class="dashboard-container">
  	<el-select style="width: 150px" class="filter-item" v-model="type">
	      <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
	      </el-option>
	</el-select>
    <el-select v-if="type >= 0 && type < 99" clearable class="filter-item" style="width: 180px" v-model="subtype">
	   <el-option v-for="item in subtypeOptions[type]" :key="item" :label="item" :value="item">
	   </el-option>
	</el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
  	return {
  		type : null,
  		subtype : null
  	}
  },
  computed: {
    ...mapGetters([
      'typeOptions',
      'subtypeOptions'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
