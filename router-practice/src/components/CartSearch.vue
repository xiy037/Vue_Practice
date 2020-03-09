<template>
  <div>
    Search Component 
    <slot name="notes" :item="result"></slot>
    <a-button @click='$emit("hide")'> Hide Results </a-button>
  </div>
</template>

<script>
export default {
  name: "CartSearch",
  data() {
    return {
      result: "searched: white T-shirt"
    }
  }
}
</script>

<style scoped>

</style>