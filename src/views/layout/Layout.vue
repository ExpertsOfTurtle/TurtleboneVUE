<template>
	<div class="app-wrapper" >
		
		<div class="sidebar">
			<sidebar class="sidebar-container"></sidebar>
		</div>
		<div class="main-container">
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Sidebar, AppMain } from 'views/layout/components'

export default {
  name: 'layout',
  components: {
    Sidebar,
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
	.app-wrapper {
	  position: relative;
	  height: 100%;
	  float:left;
	  width:100%;
	}
	.sidebar {
		position: relative;
		float:left;
		min-width:200px;
		width:20%;
		border:1px solid white;
	}
	.main-container {
		position: relative;
		float:left;
		width:75%;
		border:1px solid green;
	}
</style>
