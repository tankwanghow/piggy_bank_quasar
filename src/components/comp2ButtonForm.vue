<template>
  <div class="row">
    <div
      :class="formClass"
    >
      <div class="text-h6">{{ title }}</div>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <slot></slot>
        <br/>
        <div class="row">
          <q-btn
            v-if="!btnPryHide"
            type="submit"
            color="primary"
            :label="btnPryLabel"
            @click="$emit('submit')"
            :disable="btnPryDisable"
          />
          <q-space />
          <q-btn v-if="!btnSecHide" color="secondary" :label="btnSecLabel" :to="btnSecTo" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formClass: {
      default: "q-mt-md q-mx-auto col-lg-4 col-md-5 col-sm-6 col-xs-10 bg-grey-2 q-pa-md",
      type: String  
    },
    title: String,
    btnPryLabel: String,
    btnSecLabel: String,
    btnPryHide: { default: false, type: Boolean },
    btnSecHide: { default: false, type: Boolean },
    btnSecTo: String,
    btnPryDisable: { default: false, type: Boolean}
  }
};
</script>
