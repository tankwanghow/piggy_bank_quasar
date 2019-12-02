const state = {
  currentUser: {}
}

const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user
  }
}

const getters = {

}

const actions = {
  logout({commit}) {
    commit('setCurrentUser', {})
    this.$router.push("/")
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}