<template>
  <div class="app-container">
  	
  	<dairy-list 
  		:defaultQuery="listQuery" 
  		:editDirectTo="'Translate'"
  		:defaultTypeOptions="[0]"
  	></dairy-list>
  	
  	
    
	  
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
    		creator:'',
    		type:0,
    		subtype:0
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
