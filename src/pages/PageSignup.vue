<template>
  <loginForm
    title="Register"
    btnPryLabel="Register"
    btnSecLabel="Go to Login"
    btnSecTo="/login"
    @submit="signup()"
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

    <q-input label="Farm" dense v-model="formData.farm" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="house" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="formData.farm = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input label="Email" dense v-model="formData.email" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="email" />
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
    <q-input
      label="Confirm"
      dense
      type="password"
      v-model="formData.password_confirmation"
      class="q-mb-md"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="formData.password_confirmation = ''"
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
        farm: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    signup() {
      console.log("signup clicked");
    }
  }
};
</script>
