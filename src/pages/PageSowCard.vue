<template>
  <div>
    <h5>Sow Card</h5>
    <li v-for="f in farms" :key='f.id'>
      {{ f.name }}
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      farms: []
    }
  },
  mounted () {
    this.$axios
      .get('/farms')
      .then((res) => {
        this.farms = res.data
      })
      .catch((err) => {
        this.farms = []
      })
  }
}
</script>
