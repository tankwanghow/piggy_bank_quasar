import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'
import { i18n } from 'boot/i18n'
import { Notify } from 'quasar'

const CHECK_TOKEN_ROUTE = '/current_user'

export function logout({commit}) {
  commit('setCurrentUser', {})
  if(this.$router.currentRoute.name !== 'welcome') {
    this.$router.push("/")
  }
  Notify.create({ message: i18n.t('auth.messages.logged_out'), color: 'green' })
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