export function user (state) {
  return state.currentUser
}

export function loggedIn (state) {
  return state.currentUser.userid !== null
}