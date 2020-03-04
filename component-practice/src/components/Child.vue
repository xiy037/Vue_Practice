<template>
  <div class="task-container">
    Tasks Content
    <div v-for="item in task" :key="item.id" class="task">
    <div class="item1">task:</div>
    <GrandChild v-bind:item="item" class="item2" v-on:del-item="$emit('del-item', item.id)"/>
    </div>
  </div>
</template>
<script>
import GrandChild from "../components/GrandChild"

export default {
  name: "Child",
  components: {
    GrandChild
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