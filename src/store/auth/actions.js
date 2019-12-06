export function logout({commit}) {
  commit('setCurrentUser', {})
  this.$router.push("/")
}