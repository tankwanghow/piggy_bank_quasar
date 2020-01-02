<template>
  <q-list dense class="text-center">
    <q-item>
      <q-item-section>
        <q-item-label class="text-weight-bold">
          <q-avatar icon="house" />
          {{ $t("farm_label") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator horizontal inset />

    <q-item v-if="showChangeFarm" clickable v-close-popup to="/changeFarm">
      <q-item-section>
        <q-item-label>
          {{ $t("change_farm") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item
      v-if="showEditFarm"
      clickable
      v-close-popup
      :to="{ name: 'edit farm', params: { id: currentFarm.farm_id } }"
    >
      <q-item-section>
        <q-item-label>
          {{ $t("edit_farm") }} {{ currentFarm.nickname }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item
      v-if="showWithdrawFarm"
      clickable
      v-close-popup
      :to="{ name: 'withdraw farm' }"
    >
      <q-item-section>
        <q-item-label>
          {{ $t("withdraw_farm") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-close-popup to="/joinFarm">
      <q-item-section>
        <q-item-label>
          {{ $t("join_farm") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-close-popup to="/createFarm">
      <q-item-section>
        <q-item-label>
          {{ $t("create_farm") }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    currentFarm: null,
    currentUser: null
  },
  computed: {
    showChangeFarm() {
      return this.currentUser.farms.length > 1;
    },
    showEditFarm() {
      if (this.currentFarm) {
        return this.currentFarm.user_type === "admin";
      } else {
        return false;
      }
    },
    showWithdrawFarm() {
      return this.currentUser.farms.length > 0;
    }
  }
};
</script>
