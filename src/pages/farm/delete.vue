<template>
  <farmForm
    :title="$t('farm.labels.delete_farm')"
    :btnPryLabel="$t('farm.labels.delete')"
    :btnSecLabel="$t('farm.labels.cancel')"
    :btnPryDisable="disableChange"
    btnSecTo="/settingFarm"
    @submit="confirm = true"
  >
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <h3 class="text-red">{{$t('are_you_sure')}}</h3>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :label="$t('farm.labels.cancel')" color="green" v-close-popup />
          <q-btn :label="$t('farm.labels.yes_delete')" color="red" v-close-popup @click="deleteFarm()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div>
      <q-list>
        <q-item v-for="f in farms" :key="f.farm_user_id" tag="label" v-ripple>
          <q-item-section avatar top>
            <q-radio keep-color v-model="farm_id" :val="f.farm_id" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ f.name + "(" + f.nickname + ")" }}
            </q-item-label>
            <q-item-label caption>
              {{ $t("farm.labels.active_users") }}
              <strong>{{ f.active_user_count }}.</strong>
              {{ $t("farm.labels.pending_users") }}
              <strong>{{ f.pending_user_count }}</strong>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <p class="text-weight-bolder text-red">
        {{ $t("farm.labels.delete_farm_warning") }}
      </p>
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
      farms: this.setFarms(),
      confirm: false
    };
  },
  computed: {
    disableChange() {
      return this.farm_id === null;
    },
    farm_user_id() {
      return this.farms.find(f => {
        return f.farm_id === this.farm_id;
      }).farm_user_id;
    }
  },
  methods: {
    setFarms() {
      this.$axios.get("/admin_farms").then(res => {
        this.farms = res.data;
      });
    },
    deleteFarm() {
      this.$axios
        .delete("/farms/" + this.farm_id)
        .then(res => {
          this.$q.notify({
            message: this.$t("farm.messages.delete_success"),
            color: "green"
          });
          this.$router.push("/settingFarm");
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.$refs.fields.$data.form.error = err.response.data;
            }
          } else {
            this.$q.notify({ message: err.message, color: "red" });
          }
        });
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
