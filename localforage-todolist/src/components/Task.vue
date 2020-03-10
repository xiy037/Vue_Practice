<template>
  <div class="item-container">
    <input
      class="item1"
      type="checkbox"
      v-on:change="$emit('mark-complete', index)"
      :checked="item.complete"
    />
    <div class="item" v-bind:class="{'is-complete':item.complete}">{{item.content}}</div>
    <div class="item2">
      <div v-if="!(item.tag.length === 1 && item.tag[0] === '')">
        <a-tag v-for="t in item.tag" :key="t.index" closable visible @close="deleteTag(t)">{{t}}</a-tag>
      </div>
      <a-input
        v-if="inputVisible"
        ref="input"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        :value="inputValue"
        @change="handleInputChange"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
      />
      <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
        <a-icon type="plus" />
      </a-tag>
    </div>
    <a-button class="item1" v-on:click="$emit('del-item', item.id)">delete</a-button>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["item", "index"],
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    deleteTag(t) {
      this.item.tag = this.item.tag.filter(el => el !== t);
      this.$emit("del-tag", this.item);
    },
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.item.tag;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        this.item.tag.push(inputValue);
      }
      Object.assign(this, {
        inputVisible: false,
        inputValue: ""
      });
      this.$emit("add-tag-only", this.item);
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