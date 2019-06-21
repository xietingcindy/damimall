// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import qs from 'qs'
Vue.prototype.$qs = qs;

import axios from 'axios' 
Vue.prototype.$axios = axios
// axios.defaults.headers.post["Content-type"]="application/x-www-form-urlencoded"

import goods from './components/goods/goods'
import home from './components/home/home'
import user from './components/user/user'
import login from './components/user/login'
import about from './components/user/about'
import rate from './components/user/rate'
import collect from './components/user/collect'
import address from './components/user/address'
import update from './components/user/update'
import register from './components/user/register'
import cart from './components/shopcart/cart'
import "./common/stylus/index.styl"


// Vue.use(AV);
// Vue.use({ Axios, VueAxios});

Vue.use(VueRouter)
Vue.use(VueResource)


Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })
//路由配置
const routes = [
  //默认路由
  {path: '/', redirect: '/home'},

  { path: '/goods', component: goods },
  { path: '/home', component: home },
  { path: '/cart', component: cart },
  { 
    path: '/user',
    component: user ,
    // childern:[
    //   {
    //     path:'user/login',
    //     component:login
    //   }
    // ],t
  },
  {path:'/login',component:login},
  { path: '/register', component: register },
  { path: '/about', component: about },
  { path: '/rate', component: rate },
  { path: '/update', component: update },
  { path: '/collect', component: collect },
  { path: '/address', component: address },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 还可以传别的配置参数,
const router = new VueRouter({
  mode:'history', //去掉地址栏的#号
  linkActiveClass:'active',
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

