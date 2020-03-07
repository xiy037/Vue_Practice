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
import {storage} from "./service/service";

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
      storage.delete(id);
    },
    addTask(newItem) {
      this.task.push(newItem);
      storage.save(newItem);
    },
    markComplete(index) {
      this.task[index].complete = !this.task[index].complete;
      let itemId = this.task[index].id;
      // taskStore.setItem(itemId, this.task[index]).then(value => {
      //   console.log(value);
      // });
      storage.changeStatus(itemId);
    }
  },
  created() {
    storage.getAll(this.task);
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
