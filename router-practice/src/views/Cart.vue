<template>
  <div class="cart-container">
    Shopping cart
    <CartSearch v-if="showSearch" @hide="hideFn">
      <div class="search-results" slot="notes" slot-scope="search">
        <span class="slot-notes">slot demo for "notes"</span>
        <div>{{search.item}}</div>
      </div>
    </CartSearch>
    <a-button v-else @click="showFn">Show Search</a-button>
    <div class="total-price">
      <div>Total:</div>
      <div>{{sumCount}} items,</div>
      <div>{{sumPrice}} rmb</div>
    </div>
    <a-table :columns="cols" :dataSource="shoppingList" rowKey="id" :pagination="pagination">
      <div
        class="table-header"
        slot="title"
        slot-scope="currentPageData"
      >
      In this page, total price is {{sumCurrent(currentPageData)}} RMB 
      by summing up {{currentPageData.length}} items.
      </div>
      <span slot="action" slot-scope="text, record, index">
        <a-button v-on:click="deleteItem(index)">Delete</a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import CartSearch from "@/components/CartSearch.vue";
import store from "../assets/store"
import hub from "../assets/eventHub"
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
      shoppingList: store.cart,
      showSearch: true,
      pagination: {
        pageSize: 5,
        hideOnSinglePage: true,
        showTotal: (total, range) =>
          `Show ${range[0]} ~ ${range[1]} Records in ${total}`
      }
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
    },
    sumCurrent(arr) {
      return arr.reduce((prev, curr) => {
        return (prev += curr.price);
      }, 0);
    },
    addCart(record) {
      const arr = this.shoppingList.filter((el) => el.id === record.id);
      if (arr.length === 0) {
        const newItem = {...record};
        newItem.count = 1;
        this.shoppingList.push(newItem);
      }
      console.log(arr);
      console.log(this.shoppingList);
    }
  },
  computed: {
    sumPrice() {
      return this.shoppingList.reduce((prev, curr) => {
        return (prev += curr.price);
      }, 0);
    },
    sumCount() {
      return this.shoppingList.reduce((prev, curr) => {
        return (prev += curr.count);
      }, 0);
    }
  },
  created() {
    console.log("cart created");
    //数据必须存在store里才能成功渲染，如果直接改这个页面的数据，数据更改但不会渲染
    //另外不断切换路由，事件会累积触发。
    hub.$on("add", this.addCart);
  },
  beforeDestroy() {
    console.log("cart before destroy"); 
  }
};
</script>
<style scoped lang="less">
.cart-container {
   margin: auto;
   width: 1000px;
}
.slot-notes {
  color: white;
  background-color: #2c3e50;
}
.search-results {
  border: 1px solid grey;
}
.table-header {
  font-size: 15px;
  font-weight: 500;
  color: #143828;
}
.total-price {
  padding: 10px 40px;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  font-weight: 600;
  background-color: #3da978;
  div {
    padding: 0 10px;
  }
}
</style>