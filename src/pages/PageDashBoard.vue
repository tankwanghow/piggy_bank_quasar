<template>
  <div>
      <q-dialog v-model="prompt" persistent>
        <div class="row q-gutter-md bg-white q-pb-lg q-pr-xl">
          <div class="col-12 text-h6">Current you have no farm.</div>

          <q-btn
            class="col-12"
            color="primary"
            :label="$t('farm.labels.user_create_farm')"
            v-close-popup
            no-caps
            to='/farm'
          />

          <div class="col-12 text-h6 text-center">- OR -</div>

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
            @input="join_farm"
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

          <q-btn
            v-if="can_join"
            color="secondary"
            :label="join_farm"
            class="col-12"
            no-caps
            @click=joinFarm()
          />

          <div class="col-12 text-h6 text-center">- OR -</div>
          
          <q-btn
            class="col-12"
            no-caps
            :label="$t('back_to_welcome')"
            to="/"
            color="positive"
          />
        </div>
      </q-dialog>

    <div class='text-h3'>Dash Board</div>
  </div>
</template>

<script>
import share from 'components/utils'

export default {
  data() {
    return {
      prompt: false,
      farm: "",
      farm_options: [],
      can_join: false,
      has_error_farm: false,
      error_farm_message: ""
    };
  },
  mixins: [share],
  computed: {
    join_farm() {
      if (this.farm != "" & this.farm != null) {
        this.can_join = true;
        return this.$t("farm.labels.joining") + " => " + this.farm;
      } else {
        this.can_join = false;
      }
    }
  },
  created: function() {
    if (this.$store.state.auth.currentUser.farms.length === 0) {
      this.prompt = true;
    }
  },
  methods: {
    joinFarm () {
      this.$axios
        .post('/farm_users', { 
          params: { 
            farm_name: this.farm,
            userid: this.$store.state.auth.currentUser.userid
          }
        })
        .then(res => {
          this.error_farm_message = ""
          this.has_error_farm = false
          this.prompt = false
          this.$q.notify({ message: this.$t('farm.messages.join_success'), color: 'green' })
          this.$q.notify({ message: this.$t('farm.messages.wait_for_apporval'), color: 'orange', timeout: 20000 })
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              this.error_farm_message = this.$t('farm.errors.' + this.underscore(err.response.data.farm_id[0]))
              this.has_error_farm = true
              this.$q.notify({ message: this.$t('field_errors.data_validation_error'), color: 'red' })
            }
          } else {
            this.$q.notify({ message: err.message, color: 'red' })
          }
        })
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
