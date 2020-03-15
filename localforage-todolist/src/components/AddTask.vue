<template>
<div class="add-task-container">
  <div class="item">Categorized</div>
  <a-switch size="small" class="item" @change="switchStatus"/>
  <a-button  class="add-btn" @click="showModal"><a-icon type="plus" />New Task</a-button>
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
    },
    switchStatus(checked) {
      this.$emit("switch", checked);
    }
  }
};
</script>
<style scoped>
.add-task-container {
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.add-btn {
  color: #41b883;
  font-weight: 600;
  border: none;
  background: transparent;
}
.item {
  margin: 0 5px;
}
</style>