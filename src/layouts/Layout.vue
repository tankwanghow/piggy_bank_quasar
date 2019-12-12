<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat dense round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"/>

        <q-btn 
          no-caps flat 
          :label="$t('appName')"
          :to="currentUser.userid ? '/dashboard' : '/'"
          class="text-h6 text-weight-bolder"/>
        
        <q-space/>

        <q-btn
          v-if="showLoginBtn"
          to="/login"
          icon="account_box"
          no-caps flat rounded
          :label="$t('auth.labels.login') + ' / ' + $t('auth.labels.register')"/>
        
        <q-btn
          v-if="currentUser.userid"
          @click="layout_logout()"
          icon="exit_to_app"
          no-caps flat rounded
          :label="$t('auth.labels.logout')"/>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  created () {
    if(!this.currentUser.userid) {
      this.fetch()
    }
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    showLoginBtn () {
      return (!this.currentUser.userid && this.$route.name != 'login' && this.$route.name != 'signup')
    }
  },
  methods: {
    ...mapActions("auth", ["logout", "fetch"]),
    layout_logout() {
      this.logout()
      this.$q.notify({ message: this.$t('auth.messages.logged_out'), color: 'green' })
      this.$router.push('/')
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