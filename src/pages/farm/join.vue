<template>
  <farmForm
    :title="$t('farm.labels.join_existing_farm')"
    :btnPryLabel="$t('farm.labels.join')"
    :btnSecLabel="$t('farm.labels.cancel')"
    btnSecTo="/dashboard"
    :btnPryDisable="disableJoin"
    @submit="joinFarm()"
  >
    <q-select
      clearable
      use-input
      use-chips
      hide-selected
      v-model="farm"
      :options="farm_options"
      :label="$t('farm.labels.join_existing_farm')"
      dense
      class="col-12"
      fill-input
      input-debounce="0"
      @filter="filterFarm"
      :error-message="error_farm_message"
      :error="has_error_farm"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
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
      farm: "",
      farm_options: [],
      has_error_farm: false,
      error_farm_message: ""
    };
  },
  computed: {
    disableJoin() {
      return this.farm === ""
    }
  },
  mixins: [share],
  methods: {
    joinFarm() {
      this.$axios
        .post("/farm_users", {
          farm_id: this.farm.value,
          user_id: this.$store.state.auth.currentUser.userid
        })
        .then(res => {
          this.error_farm_message = "";
          this.has_error_farm = false;
          this.prompt = false;
          this.$q.notify({
            message: this.$t("farm.messages.join_success"),
            color: "green"
          });
          this.$q.notify({
            message: this.$t("farm.messages.wait_for_apporval"),
            color: "orange",
            timeout: 10000
          });
          this.$router.push("/dashboard")
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.error_farm_message = this.$t(
                "farm.errors." + this.underscore(err.response.data.farm_id[0])
              );
              this.has_error_farm = true;
              this.$q.notify({
                message: this.$t("field_errors.data_validation_error"),
                color: "red"
              });
            }
          } else {
            this.$q.notify({ message: err.message, color: "red" });
          }
        });
    },
    filterFarm(val, update) {
      update(() => {
        this.$axios
          .get("/farms_autocomplete", { params: { value: val, limit: 50 } })
          .then(res => {
            this.farm_options = res.data;
          });
      });
    }
  }
};
</script>
