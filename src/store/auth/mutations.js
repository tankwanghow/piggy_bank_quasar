import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export function setCurrentUser(state, user) {
  state.currentUser = user
  Cookies.set('authorization_token', user.token)
  axiosInstance.defaults.headers.common['Authorization'] = user.token
}