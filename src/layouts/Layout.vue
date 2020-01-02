<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-btn
          no-caps
          flat
          :label="$t('appName')"
          :to="currentUser.userid ? '/dashboard' : '/'"
          class="text-h6 text-weight-bolder"
        />

        <q-space />

        <q-btn
          v-if="showLoginBtn"
          to="/login"
          icon="account_box"
          no-caps
          flat
          rounded
          :label="$t('auth.labels.login') + ' / ' + $t('auth.labels.register')"
        />
        <q-badge v-if="showUserBadge" color="red" class="q-btn-dropdown-badge">
          {{ currentUser.current_farm_pending_users }}
        </q-badge>

        <q-btn-dropdown
          v-if="currentUser.userid"
          flat
          rounded
          no-caps
          :label="profileBtnLabel"
        >
        <div class='profile-btn-dropdown'>
          <mnuFarm :currentFarm="currentFarm" :currentUser="currentUser" />
          <q-separator horizontal />
          <mnuProfile
            :currentFarm="currentFarm"
            :currentUser="currentUser"
            :showUserBadge="showUserBadge"
            :showUsers="showUsers"
          />
        </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list> </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    mnuProfile: require("layouts/mnuProfile.vue").default,
    mnuFarm: require("layouts/mnuFarm.vue").default
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    showLoginBtn() {
      return (
        !this.currentUser.userid &&
        this.$route.name != "login" &&
        this.$route.name != "signup"
      );
    },
    currentFarm() {
      if (this.currentUser.userid) {
        return this.currentUser.farms.find(
          e => e.farm_id === this.currentUser.current_farm_id
        );
      }
    },
    showUserBadge() {
      if (this.currentFarm) {
        return (
          this.showUsers && this.currentUser.current_farm_pending_users > 0
        );
      } else {
        return false;
      }
    },
    showUsers() {
      if (this.currentFarm) {
        return this.currentFarm.user_type === "admin";
      } else {
        return false;
      }
    },
    profileBtnLabel() {
      var curFarm = this.currentFarm;
      var ename = this.currentUser.email.split("@")[0];
      if (curFarm) {
        return ename + " in " + curFarm.nickname;
      } else {
        return ename;
      }
    }
  }
};
</script>

<style>
.piggy_notify {
  font-weight: bold;
  font-size: 1.1rem;
}

.q-btn-dropdown-badge {
  position: relative;
  top: -8px;
  left: 15px;
}

.profile-btn-dropdown {
  width: 170px;
}
</style>
