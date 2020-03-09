<template>
  <div>
    Shopping cart
    <CartSearch v-if="showSearch" @hide="hideFn">
      <div slot="notes" slot-scope="search">
        <span class="slot-notes">slot demo for "notes"</span>
        <div>{{search.item}}</div>
      </div>
    </CartSearch>
    <a-button v-else @click="showFn">Show Search</a-button>

    <a-table :columns="cols" :dataSource="shoppingList" rowKey="id">
      <span slot="action" slot-scope="record">
        <a-button v-on:click="deleteItem(record)">Delete</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import CartSearch from "@/components/CartSearch.vue";
//用antd的tabale，cols中的dataIndex对应dataSource内的属性名

export default {
  name: "Cart",
  components: { CartSearch },
  data() {
    return {
      cols: [
        {
          title: "item-id",
          dataIndex: "id"
        },
        {
          title: "name",
          dataIndex: "content"
        },
        {
          title: "store",
          dataIndex: "store"
        },
        {
          title: "count",
          dataIndex: "count"
        },
        {
          title: "price",
          dataIndex: "price"
        },
        {
          title: "action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      shoppingList: [
        {
          id: 1,
          imgUrl: "xxxxx",
          content: "spring blue dress",
          store: "women store",
          count: 1,
          price: 169
        },
        {
          id: 2,
          imgUrl: "xxxxx",
          content: "denim pants",
          store: "women store",
          count: 1,
          price: 299
        },
        {
          id: 3,
          imgUrl: "xxxxx",
          content: "black slim pants",
          store: "Urban Outfitter",
          count: 1,
          price: 399
        },
        {
          id: 4,
          imgUrl: "xxxxx",
          content: "graphical T-shirt",
          store: "Uniqle",
          count: 1,
          price: 199
        }
      ],
      showSearch: true
    };
  },
  methods: {
    deleteItem(index) {
      this.shoppingList.splice(index, 1);
    },
    hideFn() {
      this.showSearch = false;
    },
    showFn() {
      this.showSearch = true;
    }
  }
};
</script>
<style scoped lang="less">
.slot-notes {
  color: white;
  background-color: #2c3e50;
}
</style>