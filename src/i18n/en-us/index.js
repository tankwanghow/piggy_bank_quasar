import auth from './auth'

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  auth,
  appName: 'Piggy Bank',
  errors: {
    network_error: 'Network error. Please check your internet connection'
  },
  field_errors: {
    cant_be_blank: "can't be blank",
    has_already_been_taken: 'has already been taken',
    doesnt_match_password: "dosen't match password"
  }
}
