<template>
  <div class="item-container">
    <input
      class="item1"
      type="checkbox"
      v-on:change="$emit('mark-complete', index)"
      :checked="item.complete"
    />
    <div class="item" v-bind:class='{"is-complete":item.complete}'>{{item.content}}</div>
    <div class="item2">
      <a-tag closable v-for="t in item.tag" :key="t.index" @close="deleteTag(t)"> {{t}} </a-tag>
    </div>
    <a-button class="item1" v-on:click="$emit('del-item', item.id)">delete</a-button>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["item", "index"],
  methods: {
    deleteTag(t) {
      this.item.tag = this.item.tag.filter((el) => el !== t);
      this.$emit("del-tag", this.item);
    }
  }
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
.item2 {
  flex: 2;
  display: flex;
  justify-items: flex-start;
}
.item {
  flex: 3;
  text-align: left;
  color: #41b883;
}
.is-complete {
  text-decoration-line: line-through;
}
</style>