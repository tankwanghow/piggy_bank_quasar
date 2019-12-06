<template>
  <loginForm
    :title="$t('auth.labels.register')"
    :btnPryLabel="$t('auth.labels.register')"
    :btnSecLabel="$t('auth.labels.gotoLogin')"
    btnSecTo="/login"
    @submit="signup()"
  >
    <q-input :label="$t('auth.labels.name')" dense v-model="formData.username" class="q-mb-md">
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

    <q-input :label="$t('auth.labels.farm')" dense v-model="formData.farm" class="q-mb-md">
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
    <q-input :label="$t('auth.labels.email')" dense v-model="formData.email" class="q-mb-md">
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
    <q-input
      :label="$t('auth.labels.retypePassword')"
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
