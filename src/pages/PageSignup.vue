<template>
  <loginForm
    :title="$t('auth.labels.register')"
    :btnPryLabel="$t('auth.labels.register')"
    :btnSecLabel="$t('auth.labels.gotoLogin')"
    btnSecTo="/login"
    @submit="signup()"
  >
    <q-input 
      :label="$t('auth.labels.name')" 
      dense hide-bottom-space
      class="q-mb-md"
      v-model="form.data.name"
      :error-message="errorMsg('name')"
      :error="!isValid('name')">
      <template v-slot:prepend>
        <q-icon name="account_box" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.name = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input :label="$t('auth.labels.email')" 
      dense hide-bottom-space
      v-model="form.data.email" 
      class="q-mb-md"
      :error-message="errorMsg('email')"
      :error="!isValid('email')">
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.email = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      :label="$t('auth.labels.password')"
      dense hide-bottom-space
      type="password"
      v-model="form.data.password"
      class="q-mb-md"
      :error-message="errorMsg('password')"
      :error="!isValid('password')">
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.password = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('auth.labels.retypePassword')"
      dense hide-bottom-space
      type="password"
      v-model="form.data.password_confirmation"
      class="q-mb-md"
      :error-message="errorMsg('password_confirmation')"
      :error="!isValid('password_confirmation')">
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.password_confirmation = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </loginForm>
</template>

<script>
import share from 'components/utils'

export default {
  components: {
    loginForm: require("components/CompLoginForm.vue").default
  },
  data() {
    return {
      form: {
        data: {
          name: "",
          email: "",
          password: "",
          password_confirmation: ""
        }
      }
    }
  },
  mixins: [share],
  methods: {
    signup() {
      this.$axios
        .post("/users", {
          user: this.form.data
        })
        .then(res => {
          this.$q.notify({ message: this.$t('auth.messages.good_signup'), color: 'green' })
          this.$store.dispatch('auth/login', { 
            user: { 
              email: this.form.data.email, 
              password: this.form.data.password 
            }
          })
          .then(res => {this.$router.push("/dashboard") } )
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.form.error = err.response.data
            }
          } else {
            this.$q.notify({ message: err.message, color: 'red' })
          }
        })
    }
  }
};
</script>
