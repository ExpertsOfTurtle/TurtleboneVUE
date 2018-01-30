import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TaskSummary from '@/components/TaskSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/taskSummary',
      name: 'TaskSummary',
      component: TaskSummary
    }
  ]
})
