<template>
  <div class="search-container">
    <a-input-search placeholder="Search task content here" class="search-box" @search="onSearch" v-model="input"/>
    <a-button class="search-btn" @click="clearInput">Clear</a-button>
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
      this.$emit("search-content", value);
    },
    clearInput() {
      this.input = "";
      this.$emit("clear-search");
    }
  }
}
</script>
<style scoped>
.search-container {
  display: flex;
  border: 1px solid #405872;
}
.search-box {
  width: 80%;
}
.search-btn {
  width: 20%;
}
</style>
