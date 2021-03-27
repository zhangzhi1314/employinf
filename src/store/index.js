import Vue from 'vue'
import Vuex from 'vuex'
import { asyncRouterMap } from '@/router';

Vue.use(Vuex)

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
 export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}


export default new Vuex.Store({
  state: {
    accessRouterMap: [],
    token:'',
    roles:[],
    // routers: constantRouterMap,
    // addRouters: []
  },
  mutations: {
    SET_ACCESS_ROUTER_MAP (state, playLoad) {
      state.accessRouterMap = playLoad.accessRouterMap
    },
    //用于存放token
    SET_TOKEN(state,token){
              state.token = token
    },
    SET_ROLES(state,roles){
            state.roles = roles
    },
    SET_ROUTERS: (state, routers) => {
      state.accessRouterMap = routers;
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const roles = data
        const accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRoutes);
        resolve(accessedRoutes);
      })
    }
  },
  getters: {
    accessRouterMap(state) {
      return state.accessRouterMap
    },
    token (state)  {
      return state.token
    },
    roles(state) {
      return state.roles
    }
  },
  modules: {
  }
})
