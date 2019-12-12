import { axiosInstance } from 'boot/axios'
import { Cookies, Notify } from 'quasar'
import { i18n } from 'boot/i18n'

const CHECK_TOKEN_ROUTE = '/current_user'

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