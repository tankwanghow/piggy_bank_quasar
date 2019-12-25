import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { Notify, format } from 'quasar'
import { i18n } from 'boot/i18n'
import { Loading } from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
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
    Loading.show()
    if (to.meta.requireLogin) {
      store.dispatch('auth/fetch')
        .then(() => {
          if (!store.state.auth.currentUser.userid) {
            next('/login')
            Notify.create({ message: i18n.t('auth.errors.login_required'), color: 'orange' })
          } else if (store.state.auth.currentUser.farms.length === 0 &&
            to.name !== 'dashboard' && to.name !== 'farm') {
            next('/dashboard')
          }
          else { next() }
          Loading.hide()
        })
        .catch((err) => {
          if (err.response.status === 464) {
            Notify.create({ message: i18n.t('auth.errors.token_expired'), color: 'red' })
            store.dispatch('auth/logout')
            next('/login')
          } else {
            Notify.create({ message: err.message, color: 'red' })
          }
          Loading.hide()
        })
    }
    else if ((to.name == 'login' || to.name == 'signup') && store.state.auth.currentUser.userid) {
      next(from.fullPath)
      Notify.create({
        message: i18n.t("auth.messages.already_logged_in"),
        color: 'orange'
      })
      Loading.hide()
    }
    else {
      next()
      Loading.hide()
    }
  })
  return Router
}
