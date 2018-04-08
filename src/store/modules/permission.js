import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  return {roles:roles.filter(role => route.path==role.path),index:roles.findIndex(role => route.path==role.path)}
  
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter((route,index) => {
    let check=hasPermission(roles, route)

    if (check.roles.length) {
        
         check.roles[0].meta && (route.meta.title=check.roles[0].meta.title);
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles[check.index].children)
      }
      return true
    }
    return false
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, response) {
    
      let  menu=[]
      if(response.result && response.result.menu){
        menu=response.result.menu
      }
      menu=[{"path":"/financial","meta":{"title":"金融信息管理"},"children":[{"path":"vipBao","meta":{"title":"唯品宝"},"children":[]},{"path":"vipInsurance","meta":{"title":"唯品保险"},"children":[]},{"path":"vipFund","meta":{"title":"唯基金"},"children":[]},{"path":"vipHealthAct","meta":{"title":"健保活动"},"children":[]},{"path":"vipLevelAndVipBean","meta":{"title":"金融等级与唯金豆"},"children":[]}]},{"path":"/publicManage","meta":{"title":"公共管理"},"children":[{"path":"operator","meta":{"title":"操作员管理"}},{"path":"operatorGroup","meta":{"title":"运营组别管理"}}]}];
      console.log(menu);
      alert(1);
      return new Promise(resolve => {
     
        let accessedRouters,
            accessedRoutersNow
        accessedRouters = filterAsyncRouter(asyncRouterMap, menu)
        accessedRouters.push({ path: '*', redirect: '/401', hidden: true })
        var hash=location.hash.split("/")
        let arr;
      
        if(hash.length==3){
            arr=[{    
                path: '/'+hash[hash.length-2],
                children: [
                  { path: hash[hash.length-1]}
                ]
              }
            ]
      
        } else {
           arr=[{    
                path: '/'+hash[hash.length-3],
                children: [
                  { path: '/'+hash[hash.length-3]+'/'+hash[hash.length-2],children:[
                    { path: hash[hash.length-1] }
                  ]}
                ]
              }
            ] 
        }
        
        accessedRoutersNow = filterAsyncRouter(JSON.parse(JSON.stringify(accessedRouters)),arr)
        
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRoutersNow)
      })
    }
  }
}

export default permission
