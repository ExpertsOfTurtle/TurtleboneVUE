<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Task content</h2>
    <ul>
      <li><a href="https://www.baidu.com" target="_blank">Baidu</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Last one</h2>
  </div>
</template>

<script>
export default {
  name: 'TaskSummary1',
  data () {
    return {
      msg: 'Task summary'
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
