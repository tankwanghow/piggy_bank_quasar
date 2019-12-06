<template>
  <div class="row">
    <div
      class="q-mt-md q-mx-auto col-lg-4 col-md-5 col-sm-6 col-xs-10 bg-grey-2 q-pa-md"
    >
      <q-chip v-if="errorMsg" size="md" color="red-2" icon="error">
        {{ errorMsg }}
      </q-chip>
      <div class="text-h6">{{ title }}</div>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <slot></slot>
        <div class="row">
          <q-btn
            type="submit"
            color="primary"
            :label="btnPryLabel"
            @click="$emit('submit')"
          />
          <q-space />
          <q-btn color="secondary" :label="btnSecLabel" :to="btnSecTo" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    btnPryLabel: String,
    btnSecLabel: String,
    btnSecTo: String,
    errorMsg: String
  }
};
</script>
