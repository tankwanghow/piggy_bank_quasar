<template>
  <div>
    <div class="text-h3">Dash Board</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prompt: false
    };
  },
  created: function() {
    if (this.$store.state.auth.currentUser.farms.length === 0) {
      this.prompt = true;
    }
  }
};
</script>
