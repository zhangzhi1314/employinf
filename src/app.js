//每次页面刷新，保存页面的token和角色
import store from './store'
//console.log(window.sessionStorage.getItem('token'));
let roles = window.sessionStorage.getItem("roles") && window.sessionStorage.getItem("roles").split();
store.commit("SET_TOKEN", window.sessionStorage.getItem('token'));
store.commit("SET_ROLES", roles);
