<template>
  <div class="app-container">
  	<input-dairy :type="detail.type" :subtype="detail.subtype" 
  	:content="detail.content" :dairyid="detail.dairyid" 
  	:title="detail.title" :creator="detail.creator" :status="detail.status"
  	:successCreateDirectTo="detail.successCreateDirectTo"
  	:showTypeFilter="showTypeFilter" :action="detail.action"
  	:defaultTypeOptions="[0]"
  	></input-dairy>
     
  </div>
</template>

<script>

import InputDairy from '@/views/turtle/dairy/components/InputDairy'

export default {
  name: 'dairy',
  components: { InputDairy },
  props : {
  	detail : {
  		type : Object,
  		default : function() {
  			return {
  				title : '',
  				content : '',
  				type : 0,
  				subtype : 0,
  				dairyid : null,
  				action : 'create',
  				creator : null,
  				successCreateDirectTo : 'Aritical'
  			}
  		}
  	},
  	showTypeFilter : {
  		type : Boolean,
  		default : true
  	}
  },
  data() {
    return {
    	dialogInputVisible: false,
    	listQuery : {
    		username:'',
    		type:1,
    		subtype:11
    	}
    }
  },
  filters: {
    
  },
  created() {
  	if (this.$route.params) {
  		this.detail = Object.assign(this.detail, this.$route.params)
  	}
  },
  methods: {
  	 onClickBtn() {
  	 	console.log(this.content);
  	 }
  }
}
</script>
