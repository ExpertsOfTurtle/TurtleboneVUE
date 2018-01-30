<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Header></Header>
    <Menu></Menu>
    <ul>
      <li><a href="https://www.baidu.com" target="_blank">Baidu</a></li>
      <li><router-link to="/taskSummary">Go to taskSummary</router-link></li>
	  <li>xxx</li>
    </ul>
    
  </div>
</template>



<script>

import Menu from '../components/Menu'
import Header from '../components/header'

export default {
  name: 'HelloWorld',
  components: {Menu, Header},
  data () {
    return {
      msg: 'Dev by DFS ... 乌龟'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
