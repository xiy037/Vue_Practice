<template>
  <div id="app">
    <SearchTag @search-tag="onTagSearch" @clear-search="listAll"/>
    <Header />
    <AddTask @add-task="addTask" />
    <TaskList v-bind:task="newTask" 
    @del-item="deleteTask" 
    @mark-complete="markComplete" 
    @del-tag="toggleTag"
    @add-tag-only="toggleTag"/>
    <div class="alert-box" v-if="noResult">No Results Found.</div>
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
      newTask: [],
      noResult: false
    };
  },
  methods: {
    deleteTask(id) {
      //newTask删除为了保证显示，task删除为了保证同步所有数据，这样listAll之后不会出现滞后
      this.newTask = this.newTask.filter(x => x.id !== id);
      this.task = this.task.filter(x => x.id !== id);
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
  },
  updated() {
    if (this.newTask.length === 0) {
        this.noResult = true;
      } else {
        this.noResult = false;
      }
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
  .alert-box {
    padding: 10px;
    background-color: #41b883;
    color: white;
  }
}
</style>
