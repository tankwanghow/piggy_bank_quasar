<template>
  <signupForm
    :title="$t('auth.labels.register')"
    :btnPryLabel="$t('auth.labels.register')"
    :btnSecLabel="$t('auth.labels.gotoLogin')"
    btnSecTo="/login"
    @submit="signup()"
  >
  <fields ref='fields'/>
  </signupForm>
</template>

<script>
import share from 'components/utils'

export default {
  components: {
    signupForm: require("components/comp2ButtonForm.vue").default,
    fields: require("pages/user/fields.vue").default
  },
  mixins: [share],
  methods: {
    signup() {
      this.$axios
        .post("/users", {
          user: this.$refs.fields.$data.form.data
        })
        .then(res => {
          this.$q.notify({ message: this.$t('auth.messages.good_signup'), color: 'green' })
          this.$store.dispatch('auth/login', { 
            user: { 
              email: this.$refs.fields.$data.form.data.email, 
              password: this.$refs.fields.$data.form.data.password 
            }
          })
          .then(res => {this.$router.push("/dashboard") } )
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.$refs.fields.$data.form.error = err.response.data
              this.$q.notify({ message: this.$t('field_errors.data_validation_error'), color: 'red' })
            }
          } else {
            this.$q.notify({ message: err.message, color: 'red' })
          }
        })
    }
  }
};
</script>
