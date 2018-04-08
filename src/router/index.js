import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '../views/layout/Layout'
const _import = require('./_import_development')

Vue.use(Router)

export const constantRouterMap = [
	{
		 path: '/HelloWorld',
		 name: 'HelloWorld',
		 component: HelloWorld
	},
	{
		 path: '/ProjectInfo',
		 name: 'ProjectInfo',
		 component: HelloWorld
	},
	{
	    path: '',
	    component: Layout,
	    redirect: 'dashboard',
	    meta: { title: 'Home',icon:''},
	    children: [{
	      path: 'dashboard',
	      component: _import('dashboard/index'),
	      name: 'dashboard',
	      meta: { title: 'Homepage', icon: 'home', noCache: true }
	    },
	    { path: 'onehundred', component: _import('dfs/onehundred'), name: 'vipBao', meta: { title: 'onehundred'}},
        { path: 'vipInsurance', component: _import('financial/vipInsurance'), name: 'vipInsurance', meta: { title: 'vipInsurance',icon:'insurance'}},
        { path: 'vipFund', component: _import('financial/vipFund'), name: 'vipFund', meta: { title: 'vipFund',icon:'fund'}},
        ]
	  }
]

export default new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
	
})

export const asyncRouterMap = [
    {
    path: '/financial',
    component: Layout,
    redirect: 'financial',
    name: 'financial',
    meta: {
      title: 'A',
      icon: 'financial'
    },
    children: [
        { path: 'vipBao', component: _import('financial/vipBao'), name: 'vipBao', meta: { title: '',icon:'vipBao'}},
        { path: 'vipInsurance', component: _import('financial/vipInsurance'), name: 'vipInsurance', meta: { title: '',icon:'insurance'}},
        { path: 'vipFund', component: _import('financial/vipFund'), name: 'vipFund', meta: { title: '',icon:'fund'}},
        { path: 'vipHealthAct', component: _import('financial/vipHealthAct'), name: 'vipHealthAct', meta: { title: '',icon:'health'}},
        { path: 'vipLevelAndVipBean', component: _import('financial/vipLevelAndVipBean'), name: 'vipLevelAndVipBean', meta: { title: '',icon:'level'}}
      ]
  } ,
  {
	    path: '/financial2',
	    component: Layout,
	    redirect: 'financial2',
	    name: 'financial2',
	    meta: {
	      title: 'B',
	      icon: 'financial2'
	    },
	    children: [
	        { path: 'vipBao', component: _import('financial/vipBao'), name: 'vipBao', meta: { title: '',icon:'vipBao'}},
	        { path: 'vipInsurance', component: _import('financial/vipInsurance'), name: 'vipInsurance', meta: { title: '',icon:'insurance'}},
	        { path: 'vipFund', component: _import('financial/vipFund'), name: 'vipFund', meta: { title: '',icon:'fund'}},
	        { path: 'vipHealthAct', component: _import('financial/vipHealthAct'), name: 'vipHealthAct', meta: { title: '',icon:'health'}},
	        { path: 'vipLevelAndVipBean', component: _import('financial/vipLevelAndVipBean'), name: 'vipLevelAndVipBean', meta: { title: '',icon:'level'}}
	      ]
	  } 
  
]