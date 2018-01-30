<template>
  <div class="big">
  	<h2>{{msg}}</h2>
  </div>
</template>

<script>

export default {
  name: 'header',
  data () {
    return {
      msg: 'This is header'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.big {
  border:1px solid green;
  margin:10px;
}
h1, h2 {
  font-weight: normal;
  color:red;
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
