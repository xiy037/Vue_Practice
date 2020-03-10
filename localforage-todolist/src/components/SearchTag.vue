<template>
  <div class="search-container">
    <a-input-search placeholder="Search tag here" class="search-box" @search="onSearch" v-model="input"/>
    <a-button @click="clearInput">Clear</a-button>
  </div>
</template>
<script>
export default {
  name: "SearchTag",
  data() {
    return {
      input: ""
    }
  },
  methods: {
    onSearch(value) {
      console.log(value);
      this.$emit("search-tag", value);
    },
    clearInput() {
      this.input = "";
      this.$emit("clear-search");
    }
  }
}
</script>
<style scoped>
.search-box {
  width: 300px;
}
</style>
