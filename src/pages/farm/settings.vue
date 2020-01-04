<template>
  <div class="row">
    <div
      class="q-mt-md q-mx-auto col-lg-4 col-md-5 col-sm-6 col-xs-10 bg-grey-2 q-pa-md"
    >
      <p class="col-12">
        {{ $t("farm.labels.currently_you") }}
        {{ currentFarm ? $t("farm.labels.are_in") : "" }}
        <strong>
        {{
          currentFarm
            ? currentFarm.name + " (" + currentFarm.nickname + ")"
            : ""
        }}
        {{ !currentFarm ? $t("farm.labels.have_no_farm") : "" }}
        </strong>
      </p>

      <q-btn
        class="row col-12"
        color="primary"
        :label="$t('farm.labels.create_farm')"
        v-close-popup
        no-caps
        to="/createFarm"
      />

      <q-btn
        color="secondary"
        :label="$t('farm.labels.join_existing_farm')"
        class="row col-12"
        v-close-popup
        no-caps
        to="/joinFarm"
      />

      <q-btn
        v-if="currentUser.farms.length > 0"
        color="info"
        :label="$t('farm.labels.change_farm')"
        class="row col-12"
        v-close-popup
        no-caps
        to="/changeFarm"
      />

      <q-btn
        v-if="currentFarm ?
          currentUser.farms.find(f => {
            return f.farm_id === currentFarm.farm_id;
          }).user_type === 'admin' : false
        "
        color="accent"
        :label="$t('farm.labels.edit_farm') + ' ' + currentFarm.name"
        class="row col-12"
        v-close-popup
        no-caps
        :to="{ name: 'edit farm', params: { id: currentFarm.farm_id } }"
      />

      <q-btn
        v-if="currentUser.farms.length > 0"
        color="warning"
        :label="$t('farm.labels.withdraw_farm')"
        class="row col-12"
        v-close-popup
        no-caps
        :to="{ name: 'withdraw farm' }"
      />

      <q-btn
        v-if="
          currentUser.farms.filter(f => {
            return f.user_type === 'admin';
          }).length > 0
        "
        color="negative"
        :label="$t('farm.labels.delete_farm')"
        class="row col-12"
        v-close-popup
        no-caps
        :to="{ name: 'delete farm' }"
      />

      <q-btn
        class="row col-12"
        no-caps
        :label="$t('back_to_welcome')"
        to="/"
        color="positive"
      />

      <q-btn
        v-if="currentFarm"
        class="row col-12"
        no-caps
        :label="$t('back_to_dashboard')"
        to="/dashboard"
        color="dark"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["currentUser"]),
    currentFarm() {
      if (this.currentUser.userid) {
        return this.currentUser.farms.find(
          e => e.farm_id === this.currentUser.current_farm_id
        );
      }
    }
  }
};
</script>
