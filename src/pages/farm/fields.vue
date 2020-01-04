<template>
  <div class="row q-gutter-xs">
    <q-input
      :label="$t('farm.labels.name')"
      dense
      hide-bottom-space
      class="col-11"
      v-model="form.data.name"
      :error-message="errorMsg('name')"
      :error="!isValid('name')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.name = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      :label="$t('farm.labels.address')"
      dense
      hide-bottom-space
      v-model="form.data.address"
      class="col-11"
      :error-message="errorMsg('address')"
      :error="!isValid('address')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.address = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      :label="$t('farm.labels.zipcode')"
      dense
      hide-bottom-space
      v-model="form.data.zipcode"
      class="col-md-4 col-sm-5 col-xs-11"
      :error-message="errorMsg('zipcode')"
      :error="!isValid('zipcode')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.zipcode = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('farm.labels.city')"
      dense
      hide-bottom-space
      v-model="form.data.city"
      class="col-md-3 col-sm-6 col-xs-11"
      :error-message="errorMsg('city')"
      :error="!isValid('city')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.city = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('farm.labels.state')"
      dense
      hide-bottom-space
      v-model="form.data.state"
      class="col-md-4 col-sm-5 col-xs-11"
      :error-message="errorMsg('state')"
      :error="!isValid('state')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.state = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-select
      v-model="form.data.country"
      :options="options"
      :label="$t('farm.labels.country')"
      dense
      hide-bottom-space
      class="col-md-4 col-sm-6 col-xs-11"
    >
    </q-select>

    <q-input
      :label="$t('farm.labels.weight_unit')"
      dense
      hide-bottom-space
      v-model="form.data.weight_unit"
      class="col-md-3 col-sm-5 col-xs-11"
      :error-message="errorMsg('weight_unit')"
      :error="!isValid('weight_unit')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.weight_unit = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      :label="$t('farm.labels.nickname')"
      dense
      hide-bottom-space
      class="col-md-4 col-sm-6 col-xs-11"
      v-model="form.data.nickname"
      :error-message="errorMsg('nickname')"
      :error="!isValid('nickname')"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="form.data.nickname = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

  </div>
</template>

<script>
import share from "components/utils";

export default {
  mixins: [share],
  data() {
    return {
      form: {
        data: {
          name: "",
          nickname: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          weight_unit: "Kg"
        }
      },
      options: this.$t("countries")
    };
  }
};
</script>
