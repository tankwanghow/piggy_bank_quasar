<template>
  <farmForm
    :title="$t('farm.labels.edit_farm')"
    :btnPryLabel="$t('farm.labels.save')"
    :btnSecLabel="$t('farm.labels.cancel')"
    btnSecTo="/settingFarm"
    @submit="updateFarm()"
    formClass="q-mt-md q-mx-auto col-lg-6 col-md-9 col-sm-11 col-xs-11 bg-grey-2 q-pa-md"
  >
  <fields ref='fields'/>
  </farmForm>
</template>

<script>
import share from 'components/utils'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    farmForm: require("components/comp2ButtonForm.vue").default,
    fields: require("pages/farm/fields.vue").default
  },
  created () {
    this.$axios
      .get("/farms/" + this.id)
      .then(res => {
        this.$refs.fields.$data.form.data = res.data
      })
      .catch(err => {
        this.$q.notify({ message: err.message, color: 'red' })
        this.$router.push("/settingFarm")
      })
  },
  methods: {
    updateFarm() {
      this.$refs.fields.$data.form.data['userid'] = this.$store.state.auth.currentUser.userid
      this.$axios
        .put("/farms/" + this.id, {
          farm: this.$refs.fields.$data.form.data
        })
        .then(res => {
          this.$q.notify({ message: this.$t('farm.messages.update_success'), color: 'green' })
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