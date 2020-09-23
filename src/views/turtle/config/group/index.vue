<template>
  <div class="app-container">
  	<el-tree datas="data" 
  	:props="defaultProps"
  	:load="loadNode" 
  	lazy
  	show-checkbox
  	@node-click="handleNodeClick"></el-tree>
  	
  </div>
</template>

<script>
//import {createBet, listBet, inputBet, queryBet, deleteBet} from '@/api/bet'
//import {formatDate} from '@/utils/date.js'
export default {
  data() {
    return {
      data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf'
        }
      
    }
  },
  filters: {
    dateFilter(val) {
    	return formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
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
  	handleNodeClick : function(data) {
  		console.log(data);
  	},
  	loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ label: 'root' }]);
        }
        if (node.level > 4) return resolve([]);
 
        setTimeout(() => {
          const data = [{
            label: 'leaf',
            leaf: true
          }, {
            label: 'zone'
          }];
 
          resolve(data);
        }, 500);
      }
  }
}
</script>
