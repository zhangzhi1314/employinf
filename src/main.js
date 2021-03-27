import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'
import http from '@/api/index.js' //引入封装的api接口
import '@/mock/index'
import './app.js'
Vue.prototype.$http = http //全局注册
Vue.use(ElementUI)
Vue.config.productionTip = false

//路由守卫，对用户的合法性进行判断
/*
 *to代表将要访问的路径，from代表从哪个路径来，next代表放行
 */

// router.beforeEach((to, from, next) => {
//   console.log("token的值为：",store.state.token);
//   console.log("角色为:",store.state.roles);
//     if (to.path === '/login')
//     return next()
//   //获取token值


//   //当浏览器里保存的有token时，直接放行
//   next()




// });

const whiteList = ['/login', '/'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = store.getters.token
  console.log(hasToken)
  if (hasToken) {
    console.log(to.path)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/home'
      })
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasAccessRouters = store.getters.accessRouterMap && store.getters.accessRouterMap.length > 0
      console.log('hasroles: ', hasAccessRouters)
      if (hasAccessRouters) {
        next()
      } else {
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        const roles = await store.getters.roles

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('generateRoutes', roles)

        console.log(accessRoutes)
        debugger
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({
          ...to,
          replace: true
        })
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
    }
  }
})







new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')