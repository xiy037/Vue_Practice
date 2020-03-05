<template>
  <div class="item-container">
    <input class="item1" type="checkbox" v-on:change="$emit('mark-complete', index)" :checked="item.complete"/>
    <div class="item" v-bind:class='{"is-complete":item.complete}'>{{item.content}}</div>
    <a-button class="item1" v-on:click="$emit('del-item', item.id)">delete</a-button>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["item", "index"]
};
</script>
<style scoped>
.item-container {
  margin: 0;
  padding: 0;
  display: flex;
}
.item1 {
  flex: 1;
}
.item {
  flex: 4;
  text-align: left;
  color: #41b883;
}
.is-complete {
  text-decoration-line: line-through;
}
</style>