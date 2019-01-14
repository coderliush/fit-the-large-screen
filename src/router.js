import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home'
import Login from 'page/login'
// const Home = (resolve) => {
//   import('page/home').then((module) => {
//     resolve(module)
//   })
// }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name :'login',
      path: '/login',
      component: Login,
    },
    {
      name :'home',
      path: '/home',
      component: Home,
    },
  ]
})
