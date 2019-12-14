import { axiosInstance } from 'boot/axios'
import { Cookies, Notify } from 'quasar'
import { i18n } from 'boot/i18n'

const CHECK_TOKEN_ROUTE = '/current_user'
const LOGIN_ROUTE = '/tokens'

export function login (state, data) {
  const p = new Promise(function (resolve, reject) {
    Notify.create({ message: i18n.t('auth.messages.logging_in'), color: 'orange' })
    return axiosInstance
      .post(LOGIN_ROUTE, data)
      .then(response => {
        state.commit('setCurrentUser', response.data)
        Notify.create({ message: i18n.t('auth.messages.good_login'), color: 'green' })
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}

export function logout({commit}) {
  commit('setCurrentUser', {})
  Cookies.remove('authorization_token')
}

export async function fetch(state) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token
    return axiosInstance.get(CHECK_TOKEN_ROUTE).then(res => {
      state.commit('setCurrentUser', res.data)
    })
  }
}