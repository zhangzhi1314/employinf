import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()=> import("@/views/login/index.vue")
  },
  {
    path: '/',
    redirect: "/login"
  },
  {
    path:'*',
    component: ()=> import("@/views/error-page/404.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
