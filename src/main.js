import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

import httpplugin from './common/plugin/http.js'
Vue.use(httpplugin);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/ui.styl'
Vue.use(ElementUI)

const http = httpplugin.http;
const whiteList = ['login']// 免登录白名单
Vue.mixin({
  beforeRouteEnter(to, from, next){
    if (whiteList.indexOf(to.name) !== -1) { // 在免登录白名单，直接进入
      next()
    }
    else{
      if(http.header.Authorization)
        next()
      else
        next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 