import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import { Loading } from 'quasar'

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

// Here we define a named export
// that we can later use inside .js files:

export default ({ app, router, store, Vue }) => {
  axiosInstance.interceptors.request.use((request) => {
    Loading.show()
    return request
  }), (error) => {
    Loading.show()
    return Promise.reject(error)
  }


  axiosInstance.interceptors.response.use((response) => {
    Loading.hide()
    return response
  }, (error) => {
    if (!error.response) {
      Notify.create({
        message: app.i18n.t('errors.network_error'),
        color: 'red'
      })
    } else if(error.response.status === 464) {
      Notify.create({ message: i18n.t('auth.errors.token_expired'), color: 'red'})
      store.dispatch('auth/logout')
      next('/login')
    } else if (error.response.status === 403) {
      Notify.create({
         message: app.i18n.t('auth.errors.not_authorize'), color: 'orange' 
      })
    } 
    else { 
      Notify.create({ message: error.message, color: 'red'})
    }
    Loading.hide()
    return Promise.reject(error)
  })
}

// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance

export { axiosInstance }