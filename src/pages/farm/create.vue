<template>
  <farmForm
    :title="$t('farm.labels.create_farm')"
    :btnPryLabel="$t('farm.labels.save')"
    :btnSecLabel="$t('farm.labels.cancel')"
    btnSecTo="/settingFarm"
    @submit="createFarm()"
  >
  <fields ref='fields'/>
  </farmForm>
</template>

<script>
import share from 'components/utils'

export default {
  components: {
    farmForm: require("components/comp2ButtonForm.vue").default,
    fields: require("pages/farm/fields.vue").default
  },
  methods: {
    createFarm() {
      this.$refs.fields.$data.form.data['userid'] = this.$store.state.auth.currentUser.userid
      this.$axios
        .post("/farms", {
          farm: this.$refs.fields.$data.form.data
        })
        .then(res => {
          this.$q.notify({ message: this.$t('farm.messages.create_success'), color: 'green' })
          this.$router.push("/settingFarm")
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.$refs.fields.$data.form.error = err.response.data
            }
          } else {
            this.$q.notify({ message: err.message, color: 'red' })
          }
        })
    }
  }
};
</script>
