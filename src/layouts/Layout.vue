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
                  <q-avatar icon="house" />
                  Farm
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator horizontal inset />

            <q-item clickable v-close-popup to="/changeFarm">
              <q-item-section>
                <q-item-label>
                  Change
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
                  Edit
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup to="/joinFarm">
              <q-item-section>
                <q-item-label>
                  Join
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup to="/createFarm">
              <q-item-section>
                <q-item-label>
                  New
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator horizontal />

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold">
                  <q-avatar icon="account_box" />
                  Account
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator horizontal inset />

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>
                  Profile
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="layout_logout">
              <q-item-section>
                <q-item-label>
                  Logout
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
    showLoginBtn() {
      return (
        !this.currentUser.userid &&
        this.$route.name != "login" &&
        this.$route.name != "signup"
      );
    },
    currentFarm() {
      return this.currentUser.farms.find(
        e => e.id === this.currentUser.current_farm_id
      );
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
      return this.currentFarm.id && this.currentFarm.user_type === 'admin';
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
</style>
