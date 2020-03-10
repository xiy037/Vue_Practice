<template>
  <div id="app">
    <SearchTag @search-tag="onTagSearch" @clear-search="listAll"/>
    <Header />
    <AddTask @add-task="addTask" />
    <TaskList v-bind:task="newTask" 
    @del-item="deleteTask" 
    @mark-complete="markComplete" 
    @del-tag="toggleTag"/>
  </div>
</template>
<script>
import Header from "./components/layout/Header";
import SearchTag from "./components/SearchTag";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import {storage} from "./service/service";

export default {
  name: "App",
  components: {
    TaskList,
    Header,
    AddTask,
    SearchTag
  },
  data() {
    return {
      task: [],
      newTask: []
    };
  },
  methods: {
    deleteTask(id) {
      this.newTask = this.newTask.filter(x => x.id !== id);
      storage.delete(id);
    },
    addTask(newItem) {
      this.task.push(newItem);
      this.newTask = this.task;
      storage.save(newItem);
    },
    toggleTag(item) {
      storage.delete(item.id);
      storage.save(item);
    },
    markComplete(index) {
      this.newTask[index].complete = !this.newTask[index].complete;
      let itemId = this.newTask[index].id;
      storage.changeStatus(itemId);
    },
    onTagSearch(val) {
      this.newTask = this.task.filter((el) => {
        return el.tag.includes(val);
      });
    },
    listAll() {
      this.newTask = this.task;
    }
  },
  created() {
    storage.getAll(this.task);
    //筛选tag的时候newTask就可以接filter之后的数据
    this.newTask = this.task;
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
