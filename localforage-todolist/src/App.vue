<template>
  <div id="app">
    <Header />
    <AddTask @add-task="addTask" />
    <TaskList v-bind:task="task" @del-item="deleteTask" @mark-complete="markComplete" />
  </div>
</template>
<script>
import Header from "./components/layout/Header";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import localforage from "localforage";

const taskStore = localforage.createInstance({
  name: "vue-data",
  storeName: "taskList"
});
export default {
  name: "App",
  components: {
    TaskList,
    Header,
    AddTask
  },
  data() {
    return {
      task: [
        {
          id: 2,
          content: "default task",
          complete: false
        }
      ]
    };
  },
  methods: {
    deleteTask(id) {
      this.task = this.task.filter(x => x.id !== id);
      taskStore.removeItem(id);
    },
    addTask(newItem) {
      this.task.push(newItem);
      taskStore.setItem(newItem.id, newItem).then(val => console.log(val));
    },
    markComplete(index) {
      this.task[index].complete = !this.task[index].complete;
      let itemId = this.task[index].id;
      taskStore.setItem(itemId, this.task[index]).then(value => {
        console.log(value);
      });
    }
  },
  created() {
    taskStore.length().then(len => {
      if (len > 0) {
        taskStore.iterate((value, key) => {
          const obj = { id: key };
          obj.complete = value.complete;
          obj.content = value.content;
          this.task.push(obj);
        });
      }
    });
  }
};
</script>

<style lang="less">
#app {
  margin: auto;
  width: 1000px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
