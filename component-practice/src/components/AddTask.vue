<template>
  <form @submit.prevent="addItem">
    <input type="text" name="taskInput" placeholder="Add Task..." v-model="input"/>
    <input type="submit" value="submit">
  </form>
</template>
<script>
import {v4 as uuidv4} from "uuid"
export default {
  name: "AddTask",
  data() {
    return {
      input: ""
    }
  },
  methods: {
    addItem() {
      const newItem = {
        id: uuidv4(), //when not using aixos, use uuid to provide an unique id on the fly
        content: this.input,
        complete: false
      }
      this.input = "";
      this.$emit("add-task", newItem);
    }
  }
}
</script>
<style scoped>
form {
  background-color: #8fd6b8;
}
</style>