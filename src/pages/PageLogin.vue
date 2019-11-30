<template>
  <loginForm
    title="Login"
    btnPryLabel="Login"
    btnSecLabel="Register"
    btnSecTo="/signup"
    @submit="login()"
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
export default {
  components: {
    loginForm: require("components/CompLoginForm.vue").default
  },
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$axios.post('/tokens', { 
         user: this.formData 
      }).then((res) => {
          console.log(res)
      }).catch((err) => {
          console.log(err)
      })

    }
  }
};
</script>
