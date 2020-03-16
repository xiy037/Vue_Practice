<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
    <button @click="changeCount">add count</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    changeCount() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    }
  }
}
</script>
