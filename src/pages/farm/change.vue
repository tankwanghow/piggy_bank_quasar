<template>
  <farmForm
    :title="$t('farm.labels.change_current_farm')"
    :btnPryLabel="$t('farm.labels.change')"
    :btnSecLabel="$t('farm.labels.cancel')"
    :btnPryDisable="disableChange"
    btnSecTo="/settingFarm"
    @submit="changeFarm()"
  >
    <div>

      <q-list>
        <q-item v-for="f in farms" :key="f.farm_user_id" tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio
              keep-color
              v-model="farm_id"
              :val="f.farm_id"
              :color="f.user_status === 'active' ? 'green' : 'red'"
              :disable="f.user_status === 'active' ? false : true"
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
      farm_id: this.$store.state.auth.currentUser.current_farm_id,
      farms: this.$store.state.auth.currentUser.farms
    };
  },
  computed: {
    disableChange() {
      return this.farm_id === null
    },
    farm_user_id() {
      return this.farms.find((f) => { return f.farm_id === this.farm_id }).farm_user_id
    }
  },
  methods: {
    changeFarm() {
      this.$axios
        .patch("/farm_users/" + this.farm_user_id, {
          farm_user: { default_farm: true }
        })
        .then(res => {
          this.$q.notify({ 
            message: this.$t('farm.messages.change_success'),
            color: 'green'
          })
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

<style scoped>
.red {
  color: red;
  cursor: not-allowed !important;
}

.green {
  color: green;
}
</style>