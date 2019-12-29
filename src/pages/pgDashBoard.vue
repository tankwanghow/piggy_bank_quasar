<template>
  <div>
    <q-dialog v-model="prompt" persistent>
      <div class="row q-gutter-md bg-white q-pb-lg q-pr-xl">
        <div class="col-12 text-h6">
          {{ this.$t("farm.labels.user_no_farm") }}
        </div>

        <q-btn
          class="col-12"
          color="primary"
          :label="$t('farm.labels.user_create_farm')"
          v-close-popup
          no-caps
          to="/createFarm"
        />

        <div class="col-12 text-h6 text-center">
          {{ this.$t("farm.labels.or") }}
        </div>

        <q-btn
          color="secondary"
          :label="$t('farm.labels.join_existing_farm')"
          class="col-12"
          v-close-popup
          no-caps
          to="/joinFarm"
        />

        <div class="col-12 text-h6 text-center">
          {{ this.$t("farm.labels.or") }}
        </div>

        <q-btn
          class="col-12"
          no-caps
          :label="$t('back_to_welcome')"
          to="/"
          color="positive"
        />
      </div>
    </q-dialog>

    <div class="text-h3">Dash Board</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prompt: false
    };
  },
  created: function() {
    if (this.$store.state.auth.currentUser.farms.length === 0) {
      this.prompt = true;
    }
  }
};
</script>
