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
          content: "task two",
          complete: false
        }
      ]
    };
  },
  methods: {
    deleteTask(id) {
      this.task = this.task.filter(x => x.id !== id);
      //也可以传index，然后用splice来删除。
    },
    addTask(newItem) {
      this.task.push(newItem);
    },
    markComplete(index) {
      this.task[index].complete = !this.task[index].complete;
    //这里为什么updated()不自动调用呢？大概不是mutation method，所以不监测？
    localforage.setItem("taskList", this.task).then(value => {
      console.log(value);
    });
    }
  },
  created() {
    localforage
      .getItem("taskList")
      .then(value => {
        if (value !== null) {
          this.task = value;
        }
      })
      .catch(err => console.log(err));
  },
  updated() {
    console.log("update");
    localforage.setItem("taskList", this.task).then(value => {
      console.log(value);
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
