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
        <q-badge 
          v-if="showUserBadge"
          color="red" 
          class="q-btn-dropdown-badge">
          {{ currentUser.current_farm_pending_users }}  
        </q-badge>

        <q-btn-dropdown
          v-if="currentUser.userid"
          flat
          rounded
          no-caps
          :label="profileBtnLabel"
        >
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

            <q-item clickable v-close-popup @click="layout_logout">
              <q-item-section>
                <q-item-label>
                  {{ $t("logout") }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator horizontal />

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold">
                  <q-avatar icon="house" />
                  {{ $t("farm_label") }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator horizontal accountinset />

            <q-item
              v-if="showChangeFarm"
              clickable
              v-close-popup
              to="/changeFarm"
            >
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
              :to="{ name: 'edit farm', params: { id: currentFarm.id } }"
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

            <q-separator horizontal />

            <q-item v-if="showUsers">
              <q-item-section>
                <q-item-label class="text-weight-bold">
                  <q-avatar icon="group" />
                  {{ $t("users") }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator horizontal inset />

            <q-item v-if="showUsers" clickable v-close-popup to="/users">
              
              <q-item-section>
                <q-badge
                  v-if="showUserBadge"
                  color="red" 
                  class="q-item-label-badge">
                  {{ currentUser.current_farm_pending_users }}
                </q-badge>  
                <q-item-label>
                  {{ $t("user_list") }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  created() {
    if (!this.currentUser.userid) {
      this.fetch();
    }
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    showUserBadge() {
      if (this.currentFarm) {
        return this.currentFarm.user_type === "admin" && 
               this.currentUser.current_farm_pending_users > 0;
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
          e => e.id === this.currentUser.current_farm_id
      );
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
    },
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
  },
  methods: {
    ...mapActions("auth", ["logout", "fetch"]),
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

<style>
.piggy_notify {
  font-weight: bold;
  font-size: 1.1rem;
}
.q-item-label-badge {
  right: 38px;
  top: -1px;
  position: absolute
}

.q-btn-dropdown-badge {
  position: relative;
  top: -8px;
  left: 15px;
}
</style>
