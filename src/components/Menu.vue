<template>
  <div class="nav">
	<div class="nav-top">
		<div id="mini" style="border-bottom:1px solid rgba(255,255,255,.1)"><img src="..//assets/leftmenu/images/mini.png" ></div>
	</div>
	<ul>
		<li class="nav-item">
			<a href="javascript:;"><i class="my-icon nav-icon icon_1"></i><span>网站配置</span><i class="my-icon nav-more"></i></a>
			<ul>
				<li><a href="javascript:;"><span>网站设置</span></a></li>
				<li><a href="javascript:;"><span>友情链接</span></a></li>
				<li><a href="javascript:;"><span>分类管理</span></a></li>
				<li><a href="javascript:;"><span>系统日志</span></a></li>
			</ul>
		</li>
		<li class="nav-item">
			<a href="javascript:;"><i class="my-icon nav-icon icon_2"></i><span>文章管理</span><i class="my-icon nav-more"></i></a>
			<ul>
				<li><a href="javascript:;"><span>站内新闻</span></a></li>
				<li><a href="javascript:;"><span>站内公告</span></a></li>
				<li><a href="javascript:;"><span>登录日志</span></a></li>
			</ul>
		</li>
		<li class="nav-item">
			<a href="javascript:;"><i class="my-icon nav-icon icon_3"></i><span>订单管理</span><i class="my-icon nav-more"></i></a>
			<ul>
				<li><a href="javascript:;"><span>订单列表</span></a></li>
				<li><a href="javascript:;"><span>打个酱油</span></a></li>
				<li><a href="javascript:;"><span>大头网</span></a></li>
			</ul>
		</li>
	</ul>
</div>
</template>


<script>
export default {
  name: 'Menu',
  data () {
    return {
      msg: 'I am menu'
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
div.big {
  border:5px solid red;
}
</style>
