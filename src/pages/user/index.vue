<template>
  <cform
    :title="$t('auth.labels.user_list')"
    :btnSecLabel="$t('back_to_dashboard')"
    btnSecTo="/dashboard"
    @submit="update()"
    btnPryHide
    formClass="q-mt-md q-mx-auto col-lg-6 col-md-8 col-sm-9 col-xs-11 bg-grey-2 q-pa-md"
  >
    <q-list>
      
      <q-item v-if="users.length === 0">
        {{ "No User Found." }}
      </q-item>

      <q-item v-for="(user, index) in users" :key="user.farm_user_id">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.email.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption>{{ user.email }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-select
            v-model="users[index].user_type"
            :options="user_type_options"
            label="User Type"
            dense
            @input="
              userChanged(
                users[index].user_type,
                'user_type',
                users[index].farm_user_id
              )
            "
          />
        </q-item-section>
        <q-item-section>
          <q-select
            v-model="users[index].user_status"
            :options="user_status_options"
            label="User Status"
            dense
            @input="
              userChanged(
                users[index].user_status,
                'user_status',
                users[index].farm_user_id
              )
            "
          />
        </q-item-section>
        <q-item-section>
          <q-btn 
            round 
            color="red" 
            icon="delete" 
            size="sm" 
            unelevated
            @click="deleteUser(users[index].farm_user_id)"/>
        </q-item-section>
      </q-item>
    </q-list>
  </cform>
</template>

<script>
export default {
  components: {
    cform: require("components/comp2ButtonForm.vue").default
  },
  data() {
    return {
      users: [],
      user_type_options: ["admin", "normal"],
      user_status_options: ["active", "pending"]
    };
  },
  created() {
    this.setUserList()
  },
  methods: {
    setUserList () {
      this.$axios
        .get("/farm_users/")
        .then(res => {
        this.users = res.data.filter(u => {
          return u.user_id !== this.$store.state.auth.currentUser.userid;
        });
      })
      .catch(err => {
        this.$q.notify({ message: err.message, color: "red" });
      });
    },
    userChanged(value, field, farm_user_id) {
      var farm_user = {};
      farm_user[field] = value;
      this.$axios
        .patch("/farm_users/" + farm_user_id, {
          farm_user
        })
        .then(res => {
          this.$q.notify({
            message: "Changed User to " + value,
            color: "green"
          });
        })
        .catch(err => {
          this.$q.notify({ message: err.message, color: "red" });
        });
    },
    deleteUser(farm_user_id) {
      this.$axios
        .delete("/farm_users/" + farm_user_id)
        .then(res => {
          this.setUserList()
          this.$q.notify({
            message: "User Deleted",
            color: "green"
          });
        })
        .catch(err => {
          this.$q.notify({ message: err.message, color: "red" });
        });
    }
  }
};
</script>
