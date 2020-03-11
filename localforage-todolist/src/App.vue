<template>
  <div id="app">
    <SearchTag @search-content="onContentSearch" @clear-search="listAll" />
    <Header />
    <AddTask @add-task="addTask" />
    <a-layout>
      <a-layout-sider id="app-sider">
        <div>
          <h2>Tags</h2>
          <a-button class="tag-btn" @click="listAll" shape="round">All</a-button>
          <a-button
            class="tag-btn"
            v-for="(value, name) in existedTags"
            :key="name"
            @click="showTagContent(value)"
          >{{name}}</a-button>
        </div>
        <div>
          <h2>Status</h2>
          <a-button class="status-btn" type="dashed" @click="showCompletedTasks">Complete</a-button>
          <a-button class="status-btn" type="dashed" @click="showActiveTasks">Active</a-button>
        </div>
      </a-layout-sider>
      <a-layout-content id="app-content">
        <TaskList
          v-bind:task="newTask"
          @del-item="deleteTask"
          @mark-complete="markComplete"
          @del-tag="toggleTag"
          @add-tag-only="toggleTag"
        />
        <div class="alert-box" v-if="noResult">No Results Found.</div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import Header from "./components/layout/Header";
import SearchTag from "./components/SearchTag";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { storage } from "./service/service";

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
      //不监测状态改变，不会触发新的渲染
      this.newTask[index].complete = !this.newTask[index].complete;
      let itemId = this.newTask[index].id;
      storage.changeStatus(itemId);
    },
    onContentSearch(val) {
      this.newTask = this.task.filter(el => {
        return el.content.includes(val);
      });
    },
    listAll() {
      this.newTask = this.task;
    },
    showTagContent(value) {
      this.newTask = value;
    },
    showCompletedTasks() {
      this.newTask = this.tasksWithStatus.complete;
    },
    showActiveTasks() {
      this.newTask = this.tasksWithStatus.active;
    }
  },
  computed: {
    existedTags() {
      const allTags = this.task.reduce((prev, curr) => {
        for (let i = 0; i < curr.tag.length; i++) {
          if (curr.tag[i] in prev) {
            prev[curr.tag[i]].push(curr);
          } else {
            const newArr = [];
            newArr.push(curr);
            prev[curr.tag[i]] = newArr;
          }
        }
        return prev;
      }, {});
      return allTags;
    },
    tasksWithStatus() {
      const allTasks = this.task.reduce((prev, curr) => {
        if (curr.complete) {
          prev.complete.push(curr);
        } else {
          prev.active.push(curr);
        }
        return prev;
      },{complete:[], active:[]});
      return allTasks
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
  #app-sider {
    background-color: #405872;
    h2 {
      color: #41b883;
    }
    .tag-btn {
      margin: 5px;
    }
    .status-btn {
      margin: 10px;
      width: 80%;
    }
  }
  #app-content {
    height: 600px;
  }
}
</style>
