<template>
  <div>
    AllClothes
    <div>
      Women
     <a-table :columns="cols" :dataSource="women" rowKey="id">
       <img slot="image" slot-scope="imgUrl" :src="getImage(imgUrl)" :alt="imgUrl" height="100"/>
       <a-button slot="add" slot-scope="text, record" @click="addToCart(record)">add to cart</a-button>
     </a-table>
    </div>
      <div>
      Men
     <a-table :columns="cols" :dataSource="men" rowKey="id">
       <img slot="image" slot-scope="imgUrl" :src="getImage(imgUrl)" :alt="imgUrl" height="100"/>
       <a-button slot="add" slot-scope="text" @click="addToCart(text)">add to cart</a-button>
     </a-table>
    </div>
  </div>
</template>

<script>
import store from "../assets/store"
import hub from "../assets/eventHub"

export default {
  name: "AllClothes",
  data() {
    return {
      women: store.women,
      men: store.men,
      cols: [
        {
          title: "item-id",
          dataIndex: "id"
        },
        {
          title: "image",
          dataIndex: "imgUrl",
          scopedSlots: {customRender: "image"}
        },
        {
          title: "description",
          dataIndex: "content"
        },
        {
          title: "store-name",
          dataIndex: "store"
        },
        {
          title: "price",
          dataIndex: "price"
        },
        {
          title: "Add",
          key: "add",
          scopedSlots: {customRender: "add"}
        }
      ]
    }
  },
  methods: {
    getImage(url) {
      return require("../assets/img/" + url);
    },
    addToCart(record) {
      //用eventHub在不同路由的页面间传递数据会有问题，看console
      hub.$emit("add", record);
      console.log("emit data");
    }
  },
  //观察各个路由页面的生命周期
  created() {
    console.log("all clothes created");
  },
  beforeDestroy() {
    console.log("all clothes before destroy");
  }
}
</script>