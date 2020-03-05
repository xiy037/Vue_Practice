<template>
  <a-form layout="inline">
    <a-form-item>
      <a-input type="text" name="taskInput" placeholder="Add Task..." v-model="input" />
    </a-form-item>
    <a-form-item>
      <a-button @click="addItem">Add</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "AddTask",
  data() {
    return {
      input: ""
    };
  },
  methods: {
    addItem() {
      if (this.input.trim().length > 0) {
        const newItem = {
          id: uuidv4(),
          content: this.input,
          complete: false
        };
        this.input = "";
        this.$emit("add-task", newItem);
      } else {
        alert("Please Enter Task First!")
      }
    }
  }
};
</script>
<style scoped>
form {
  background-color: #8fd6b8;
}
</style>