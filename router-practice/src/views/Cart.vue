<template>
  <div>
    Shopping cart
    <CartSearch />

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
//scopedSlots: {customRender: "action"}表明这个项可以自定义显示, slot-scope表示拿到的每个item

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
          scopedSlots: {customRender: "action"}
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
      ]
    };
  },
  methods: {
    deleteItem(item) {
      let id = item.id
      this.shoppingList = this.shoppingList.filter((el) => el.id !== id);
    }
  }
};
</script>