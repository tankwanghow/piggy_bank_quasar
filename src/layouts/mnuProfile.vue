<template>
  <q-list dense class="text-center">
    <q-item>
      <q-item-section>
        <q-item-label class="text-weight-bold">
          <q-avatar icon="person" />
          {{ $t("account") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator horizontal inset />

    <q-item clickable v-close-popup :to="{ name: 'edit user' }">
      <q-item-section>
        <q-item-label>
          {{ $t("edit_profile") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-close-popup :to="{ name: 'setting farm' }">
      <q-item-section>
        <q-item-label>
          {{ $t("farm_setting") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="showUsers" clickable v-close-popup to="/user_list">
      <q-item-section>
        <q-badge v-if="showUserBadge" color="red" class="q-item-label-badge">
          {{ currentUser.current_farm_pending_users }}
        </q-badge>
        <q-item-label>
          {{ $t("user_list") }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-close-popup @click="layout_logout">
      <q-item-section>
        <q-item-label>
          {{ $t("logout") }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    currentFarm: null,
    currentUser: null,
    showUserBadge: null,
    showUsers: null
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    layout_logout() {
      this.logout();
      this.$q.notify({
        message: this.$t("auth.messages.logged_out"),
        color: "green"
      });
      if (this.$router.currentRoute.name !== "welcome") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q-item-label-badge {
  right: 40px;
  top: -1px;
  position: absolute;
}
</style>