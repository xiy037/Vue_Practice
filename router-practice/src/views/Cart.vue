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
          count: 2,
          price: 500
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
        },
        {
          id: 5,
          imgUrl: "xxxxx",
          content: "graphical T-shirt",
          store: "Uniqle",
          count: 1,
          price: 199
        },
        {
          id: 6,
          imgUrl: "xxxxx",
          content: "graphical T-shirt",
          store: "Muji",
          count: 1,
          price: 199
        },
        {
          id: 7,
          imgUrl: "xxxxx",
          content: "bag",
          store: "Muji",
          count: 1,
          price: 299
        }
      ],
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