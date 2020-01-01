<template>
  <farmForm
    :title="$t('farm.labels.withdraw_from_farm')"
    :btnPryLabel="$t('farm.labels.withdraw')"
    :btnSecLabel="$t('farm.labels.cancel')"
    btnSecTo="/dashboard"
    :btnPryDisable="disableWithdraw"
    @submit="withdrawFarm()"
  >
    <div>

      <q-list>
        <q-item v-for="f in farms" :key="f.id" tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio
              keep-color
              v-model="farm"
              :val="f.id"
              :color="f.user_status === 'active' ? 'green' : 'red'"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              :class="f.user_status === 'active' ? 'green' :  'red'">
              {{ f.name + "(" + f.nickname + ")" }}
            </q-item-label>
            <q-item-label caption>
              {{ $t('farm.labels.status') }} <strong>{{ f.user_status }}</strong>.
              {{ $t('farm.labels.privilege') }} <strong>{{ f.user_type }}</strong>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </farmForm>
</template>

<script>
import share from "components/utils";

export default {
  components: {
    farmForm: require("components/comp2ButtonForm.vue").default
  },
  data() {
    return {
      farm: this.$store.state.auth.currentUser.current_farm_id,
      farms: this.$store.state.auth.currentUser.farms
    };
  },
  computed: {
    disableWithdraw() {
      return this.farm === null
    }
  },
  methods: {
    withdrawFarm() {
      this.$axios
        .delete("/farm_users/0", {
          data: { farm_id: this.farm }
        })
        .then(res => {
          this.$q.notify({ 
            message: this.$t('farm.messages.withdraw_success'), 
            color: 'green'
          })
          this.$router.push("/dashboard")
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

<style scoped>
.red {
  color: red;
}

.green {
  color: green;
}
</style>