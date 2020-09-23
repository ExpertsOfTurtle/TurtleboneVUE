import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = 'danny'

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('hasToken:' + hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log('hasRoles:' + store.getters.roles)
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/GetInfoFake')
          console.log(roles)

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log(accessRoutes)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
/*
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(from, to)
  const username = getUsername()
  if (username && username.trim().length > 0) {
    console.log('username is ', username)
    if (!getRouter) {
      console.log('getRouter is null')
      if (!getObjArr('router')) {
        console.log('localStorage has not router')
        getRouterData(username, '').then(res => {
          console.log(res)
          getRouter = res.data.router
          saveObjArr('router', getRouter) // 存储路由到localStorage
          routerGo(to, next)// 执行路由跳转方法
          retryCount = 0
        }).catch(err => {
          retryCount--
          console.log(err)
          Message.error(err)
        })
      } else {
        console.log('localStorage has router')
        getRouter = getObjArr('router')// 拿到路由
        console.log(getRouter)
        routerGo(to, next)
      }
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
 */
/*
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfoFake').then(res => { // 拉取用户信息
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
*/
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
