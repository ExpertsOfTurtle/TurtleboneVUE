<template>
  <div class="app-container">
	  我还没开始写代码~~~
  </div>
</template>

<script>
//import {createBet, listBet, inputBet, queryBet, deleteBet} from '@/api/bet'

export default {
  data() {
    return {
      
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
    
  },
  methods: {
  	
  }
}
</script>
