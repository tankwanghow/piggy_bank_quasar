import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ( { store } ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
  
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if(to.meta.requireLogin) {
      if(!store.state.auth.currentUser.userid) {
        next('/login')
      }
      else {
        next()
      }
    }
    else if ((to.name == 'login' || to.name == 'signup') && store.state.auth.currentUser.userid) {
      next(from.fullPath)
    }
    else {
      next()
    }
  })
  

  return Router
}
