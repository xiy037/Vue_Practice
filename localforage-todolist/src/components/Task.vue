<template>
  <div class="item-container">
    <input
      class="item1"
      type="checkbox"
      v-on:change="$emit('mark-complete', index)"
      :checked="item.complete"
    />
    <div v-if="isContent" class="item" v-bind:class="{'is-complete':item.complete}">{{item.content}}</div>
    <div v-else class="item">
      <a-input
      type="text"
      :defaultValue="defaultTask"
      @change="editTask"
      @blur="closeEdit"
      @keyup.enter="confirmEdit"
      ></a-input>
    </div>

    <div class="item2">
      <div v-if="!(item.tag.length === 1 && item.tag[0] === '')">
        <a-tag v-for="t in item.tag" :key="t.index" closable visible @close="deleteTag(t)">{{t}}</a-tag>
      </div>
      <a-input
        v-if="inputTagVisible"
        ref="input"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        :value="inputTagValue"
        @change="handleInputChange"
        @blur="handleInputClose"
        @keyup.enter="handleInputConfirm"
      />
      <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
        <a-icon type="plus" />
      </a-tag>
    </div>
    <div class="item1">
      <a-icon
        type="edit"
        class="action-icon"
        :style="{color: '#41b883'}"
        @click="toggleEditStatus"
      />
      <a-icon
        type="close"
        class="action-icon"
        :style="{color: 'red'}"
        v-on:click="$emit('del-item', item.id)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["item", "index"],
  data() {
    return {
      inputTagVisible: false,
      inputTagValue: "",
      isContent: true,
      defaultTask: "",
      inputTask: ""
    };
  },
  methods: {
    deleteTag(t) {
      this.item.tag = this.item.tag.filter(el => el !== t);
       this.$emit("update-task", this.item);
    },
    handleInputChange(e) {
      this.inputTagValue = e.target.value;
    },
    showInput() {
      this.inputTagVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleInputClose() {
        Object.assign(this, {
        inputTagVisible: false,
        inputTagValue: ""
      });
    },
    handleInputConfirm() {
      const inputTagValue = this.inputTagValue;
      let tags = this.item.tag;
      if (inputTagValue && tags.indexOf(inputTagValue) === -1) {
        this.item.tag.push(inputTagValue);
      }
      Object.assign(this, {
        inputTagVisible: false,
        inputTagValue: ""
      });
       this.$emit("update-task", this.item);
    },
    toggleEditStatus() {
      this.isContent = false;
    },
    editTask(e) {
      this.inputTask = e.target.value;
    },
    closeEdit() {
      this.isContent = true;
      this.inputTask = "";
    },
    confirmEdit() {
      if (this.inputTask.trim() !== "") {
        this.item.content = this.inputTask;
      }
      this.isContent = true;
      this.inputTask = "";
      this.$emit("update-task", this.item);
    }
  },
  created() {
    this.defaultTask = this.item.content;
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
.action-icon {
  padding: 0 10px;
}
</style>