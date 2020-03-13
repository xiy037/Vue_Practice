<template>
<div>
  <a-button  @click="showModal"><a-icon type="plus" />New Task</a-button>
  <a-modal title="New Task" v-model="visible" @ok="addItem">
  <a-form layout="inline">
    <a-form-item label="Task:">
      <a-input type="text" name="taskInput" placeholder="Add Task..." v-model="input" />
    </a-form-item>
     <a-form-item label="Tags:">
      <a-input type="text" name="tagInput" placeholder="Add tag..." v-model="inputTag" />
    </a-form-item>
  </a-form>
  </a-modal>
</div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "AddTask",
  data() {
    return {
      visible: false,
      input: "",
      inputTag: "",
      tags: []
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    addItem() {
      if (this.input.trim().length > 0) {
        const newItem = {
          id: uuidv4(),
          content: this.input,
          complete: false,
        };
        this.tags = this.inputTag.split(", ");
        newItem.tag = this.tags;
        this.input = "";
        this.inputTag = "";
        this.tags = [];
        this.$emit("add-task", newItem);
      } else {
        alert("Please Enter Task First!")
      }
      this.visible = false;
    }
  }
};
</script>
<style scoped>

</style>