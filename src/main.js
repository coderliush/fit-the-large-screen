import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

import http from './common/plugin/http.js'
Vue.use(http);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/ui.styl'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 