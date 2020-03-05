<template>
  <div>
    <h1>This is contact page</h1>
    <a-button  type="primary" @click="showMessage">Contact US</a-button>
    <div>
      {{message}}
      <a-button v-if="message.length > 0" type="dashed" @click="clearMessage">Clear</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Contact",
  data() {
    return {
      message: ""
    }
  },
  methods: {
    showMessage() {
      this.message = "Contact Us through Email: xxxx@yyyy.com";
    },
    clearMessage() {
      this.message = "";
    }
  }
}
</script>