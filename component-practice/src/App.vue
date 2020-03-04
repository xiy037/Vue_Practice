<template>
  <div id="app">
    <Header />
    <AddTask @add-task="addTask"/>
    <TaskList v-bind:task="task" @del-item="deleteTask"/>
  </div>
</template>

<script>
import Header from "./components/layout/Header"
import TaskList from "./components/TaskList"
import AddTask from "./components/AddTask"
import axios from "axios"

export default {
  name: 'App',
  components: {
    TaskList,
    Header,
    AddTask
  },
  data() {
    return {
      task: [
        {
          id: 1,
          content: "task one",
          complete: false
        },
        {
          id: 2,
          content: "task two",
          complete: true
        }
      ]
    }
  },
  methods: {
    deleteTask(id) {
      axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() =>  this.task = this.task.filter(x => x.id !== id))
      .catch(err => console.log(err))
    },
    addTask(newItem) {
      const {content, complete} = newItem;
      axios.post("http://localhost:3000/tasks", {
        "content": content,
        "complete": complete
      }).then(res => this.task.push(res.data))
      .catch(err => console.log(err));
    }
  },
  created() {
    axios.get("http://localhost:3000/tasks")
    .then(res => this.task = res.data)
    .catch(err => console.log(err));
  }
}
</script>

<style>
#app {
  width: 500px;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
