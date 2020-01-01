<template>
  <editForm
    :title="$t('auth.labels.edit_profile')"
    :btnPryLabel="$t('auth.labels.update')"
    :btnSecLabel="$t('auth.labels.cancel')"
    btnSecTo="/dashboard"
    @submit="update()"
  >
  <fields ref='fields'/>
  </editForm>
</template>

<script>
import share from 'components/utils'

export default {
  components: {
    editForm: require("components/comp2ButtonForm.vue").default,
    fields: require("pages/user/fields.vue").default
  },
  mixins: [share],
  created () {
    this.$axios
      .get("/users/" + this.$store.state.auth.currentUser.userid,)
      .then(res => {
        this.$refs.fields.$data.form.data = res.data
      })
      .catch(err => {
        this.$q.notify({ message: err.message, color: 'red' })
      })
  },
  methods: {
    update() {
      this.$axios
        .put("/users/" + this.$store.state.auth.currentUser.userid, {
          user: this.$refs.fields.$data.form.data
        })
        .then(res => {
          this.$q.notify({ message: this.$t('auth.messages.update_success'), color: 'green' })
          this.$router.push("/dashboard")
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.form.error = err.response.data
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
