<template>
  <farmForm
    :title="$t('farm.labels.create_farm')"
    :btnPryLabel="$t('farm.labels.save')"
    :btnSecLabel="$t('farm.labels.cancel')"
    btnSecTo="/dashboard"
    @submit="saveFarm()"
  >
    <q-input 
      :label="$t('farm.labels.name')" 
      dense hide-bottom-space
      class="q-mb-md"
      v-model="form.data.name"
      :error-message="errorMsg('name')"
      :error="!isValid('name')">
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.name = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input :label="$t('farm.labels.address')" 
      dense hide-bottom-space
      v-model="form.data.address" 
      class="q-mb-md"
      :error-message="errorMsg('address')"
      :error="!isValid('address')">
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.address = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      :label="$t('farm.labels.city')"
      dense hide-bottom-space
      v-model="form.data.city"
      class="q-mb-md"
      :error-message="errorMsg('city')"
      :error="!isValid('city')">
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.city = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('farm.labels.state')"
      dense hide-bottom-space
      v-model="form.data.state"
      class="q-mb-md"
      :error-message="errorMsg('state')"
      :error="!isValid('state')">
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.state = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-select 
      v-model="form.data.country" 
      :options="options" 
      :label="$t('farm.labels.country')"
      dense hide-bottom-space 
      class="q-mb-md"
    >
    </q-select>
    <q-input
      :label="$t('farm.labels.weight_unit')"
      dense hide-bottom-space
      v-model="form.data.weight_unit"
      class="q-mb-md"
      :error-message="errorMsg('weight_unit')"
      :error="!isValid('weight_unit')">
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.weight_unit = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </farmForm>
</template>

<script>
import share from 'components/utils'

export default {
  components: {
    farmForm: require("components/Comp2ButtonForm.vue").default
  },
  data() {
    return {
      form: {
        data: {
          name: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          weight_unit: ""
        }
      },
      options: this.$t('countries')
    }
  },
  mixins: [share],
  methods: {
    saveFarm() {
      this.form.data['userid'] = this.$store.state.auth.currentUser.userid
      this.$axios
        .post("/farms", {
          farm: this.form.data
        })
        .then(res => {
          this.$q.notify({ message: this.$t('farm.messages.create_success'), color: 'green' })
          this.$router.push("/dashboard")
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
