<template>
  <div class="app-container">
  	
  	<dairy-list :defaultQuery="listQuery" :editDirectTo="'CreateFootstep'"></dairy-list>
  	
  	
    
	  
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import DairyList from '@/views/turtle/dairy/components/DairyList'
export default {
  name: 'dairy',
  components: { Tinymce, DairyList },
  data() {
    return {
    	dialogInputVisible: false,
    	content:'',
    	listQuery : {
    		creator:''
    	}
    }
  },
  filters: {
    
  },
  created() {
   
  },
  methods: {
  	 onClickBtn() {
  	 	console.log(this.content);
  	 },
  	 handleAdd() {
  	 	this.dialogInputVisible = true
  	 }
  }
}
</script>
