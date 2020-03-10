import localforage from "localforage";

const taskStore = localforage.createInstance({
  name: "vue-data",
  storeName: "taskList"
});

const storage = {
  getAll : (arr) => {
      taskStore.length().then(len => {
      if (len > 0) {
        taskStore.iterate((value, key) => {
          const obj = { id: key };
          obj.complete = value.complete;
          obj.content = value.content;
          obj.tag = value.tag;
          arr.push(obj);
        });
      }
    });
  },
  save : (newItem) => {
   taskStore.setItem(newItem.id, newItem).then(val => console.log(val));
  },
  delete : (id) => {
    taskStore.removeItem(id);
  },
  changeStatus : (id) => {
    taskStore.getItem(id).then((val) => {
      val.complete = !val.complete;
      taskStore.setItem(id, val);
    })
  }
};

export {storage};