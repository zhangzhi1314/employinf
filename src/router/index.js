import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

export const constantRouterMap = [{
    path: '/home',
    hidden: true,
    name: 'home',
    component: Layout,
    children: [{
      path: 'userinfo',
      component: () => import('@/views/userInfo/index'),

    },]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },

]
export default new Router({
  routes: constantRouterMap
})

//异步挂载路由，根据用户角色获得路由表
export const asyncRouterMap = [{
    path: '/uploadInfo',
    component: Layout,
    meta: {
      role: ['student']
    }, //页面需要的权限
    children: [{
      path: 'index',
      component: ()=>import('@/views/uploadInfo/index.vue'),
      name: 'uploadInfo',
      meta: {
        role: ['student']
      } //页面需要的权限
    }]
  },


  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];



