<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>This is a demo for Vue-router.</p>
    <p>UI library is "Ant Design Vue"</p>
    <input v-model="name" />
    <input v-model="message"/>
    <p>{{name}}'s message is: {{ message }}</p>
  </div>
</template>
<script>
  export default {
    name: "About",
    data() {
      return {
        name: "User",
        message: "default value"
      }
    }
  }
</script>
