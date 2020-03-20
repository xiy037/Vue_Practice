<template>
  <div id="app">
    <SearchTag @search-content="onContentSearch" @clear-search="showAllTasks('')" />
    <Header />

    <a-layout>
      <a-layout-sider id="app-sider" :trigger="null" collapsible v-model="collapsed">
        <div class="tags-content">
          <h2>Tags</h2>
          <div :class="{'hidden-sider':collapsed}">
            <a-button
              class="tag-btn"
              v-for="(value, name) in existedTags"
              :key="name"
              @click="showTagContent(value, name)"
            >{{name}}</a-button>
          </div>
        </div>
        <h2>Tasks</h2>
        <div>
          <a-button class="status-btn" @click="showAllTasks('')" type="dashed">All</a-button>
          <a-button class="status-btn" type="dashed" @click="showAllTasks('complete')">Done</a-button>
          <a-button class="status-btn" type="dashed" @click="showAllTasks('active')">Active</a-button>
        </div>
      </a-layout-sider>
      <a-layout-content id="app-content">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <AddTask @add-task="addTask" @switch="switchFn" />
        <TaskList
          v-bind:task="newTask"
          @del-item="deleteTask"
          @mark-complete="markComplete"
          @update-task="updateTask"
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

const sortArr = array => {
  return array.reduce(
    (prev, curr) => {
      if (curr.complete) {
        prev.complete.push(curr);
      } else {
        prev.active.push(curr);
      }
      return prev;
    },
    { complete: [], active: [] }
  );
};

const categorizedList = (checked, originalList) => {
  if (!checked) {
    return originalList;
  } else {
    const sortedList = sortArr(originalList);
    const result = [...sortedList.active, ...sortedList.complete];
    return result;
  }
}

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
      searchResult: [],
      noResult: false,
      collapsed: false,
      tagNow: "",
      listMode: "all"
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
      this.listMode = "all";
      storage.save(newItem);
    },
    updateTask(item) {
      console.log("update task");
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
      this.searchResult = this.task.filter(el => {
        return el.content.includes(val);
      });
      this.newTask = this.searchResult;
      this.listMode = "search";
    },
    showTagContent(value, name) {
      this.newTask = value;
      this.tagNow = name;
      this.listMode = "tag";
    },
    showAllTasks(mode) {
      if (mode === "complete") {
        this.newTask = this.tasksWithStatus.complete;
      } else if (mode === "active") {
        this.newTask = this.tasksWithStatus.active;
      } else {
        this.newTask = this.task;
      }
      this.listMode = "all";
    },
    switchFn(checked) {
      switch (this.listMode) {
        case "all":
          this.newTask = categorizedList(checked, this.task);
          break;
        case "tag":
          this.newTask = categorizedList(checked, this.existedTags[this.tagNow]);
          break;
        case "search":
          this.newTask = categorizedList(checked, this.searchResult);
      }
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
      return sortArr(this.task);
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
}
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
      margin-top: 20px;
      color: #41b883;
    }
    .tag-btn {
      margin: 5px;
    }
    .tags-content {
      height: 40%;
      overflow: scroll;
    }
    .status-btn {
      margin: 10px;
      width: 80%;
      background-color: #7bd1aa;
    }
    .hidden-sider {
      display: none;
    }
  }
  #app-content {
    position: relative;
    height: 600px;
    .trigger {
      position: absolute;
      left: 5px;
      top: 5px;
      font-size: 18px;
      transition: 0.3s;
    }
  }
}
</style>
