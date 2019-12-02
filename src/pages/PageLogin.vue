<template>
  <loginForm
    title="Login"
    btnPryLabel="Login"
    btnSecLabel="Register"
    btnSecTo="/signup"
    @submit="login()"
    :errorMsg="errorMsg"
  >
    <q-input label="Username" dense v-model="formData.username" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="account_box" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="formData.username = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      label="Password"
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
        username: "",
        password: ""
      },
      errorMsg: ""
    };
  },
  methods: {
    ...mapMutations('auth', ['setCurrentUser']),
    login() {
      this.errorMsg = "";
      this.$axios
        .post("/tokens", {
          user: this.formData
        })
        .then(res => {
          this.setCurrentUser(res.data);
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.setCurrentUser({});
          if (err.response) {
            if (err.response.status == 401) {
              this.errorMsg = "Wrong Username or Password.";
            } else {
              this.errorMsg = err.response.statusText;
            }
          } else {
            this.errorMsg = err.message;
          }
        });
    }
  }
};
</script>
