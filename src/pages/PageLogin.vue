<template>
  <loginForm
    :title="$t('auth.labels.login')"
    :btnPryLabel="$t('auth.labels.login')"
    :btnSecLabel="$t('auth.labels.register')"
    btnSecTo="/signup"
    @submit="login()"
  >
    <q-input :label="$t('auth.labels.email')"
      dense v-model="formData.email" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="account_box" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="formData.email = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('auth.labels.password')"
      dense
      type="password"
      v-model="formData.password"
      class="q-mb-md"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="formData.password = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </loginForm>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {
    loginForm: require("components/CompLoginForm.vue").default
  },
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations('auth', ['setCurrentUser']),
    login() {
      this.$axios
        .post("/tokens", {
          user: this.formData
        })
        .then(res => {
          this.setCurrentUser(res.data)
          this.$router.push("/dashboard")
          this.$q.notify({ message: this.$t('auth.messages.good_login'), color: 'green' })
        })
        .catch(err => {
          this.setCurrentUser({})
          if (err.response) {
            if (err.response.status == 401) {
              this.$q.notify({ message: this.$t('auth.errors.invalid_credentials'), color: 'red' })
            } 
          } else {
            this.$q.notify({ message: err.message, color: 'red' })
          }
        })
    }
  }
};
</script>
