<template>
  <div class="task-container">
    Tasks Content
    <div v-for="(item, index) in task" :key="item.index" class="task">
    <div class="item1">No.{{index+1}}</div>
    <Task v-bind:item="item" :index="index" class="item2"
     v-on:del-item="$emit('del-item', item.id)" 
     @mark-complete="$emit('mark-complete', index)"
     @del-tag="$emit('del-tag', item)"
     @add-tag-only="$emit('add-tag-only', item)"
    />
    </div>
  </div>
</template>
<script>
import Task from "../components/Task"

export default {
  name: "TaskList",
  components: {
    Task
  },
  props: ["task"]
};
</script>
<style scoped>
.task-container {
  font-weight: 800;
  color: #405872;
}
.task {
  display: flex;
  padding: 10px;
  background-color: #ecf8f3;
  border: 1px solid white;
}
.item1 {
  flex: 1;
}
.item2 {
  flex: 5;
}
</style>