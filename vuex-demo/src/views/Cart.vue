<template>
  <div>
    Cart
    <a-row class="row">
      <a-col :span="3">Id</a-col>
      <a-col :span="6">Name</a-col>
      <a-col :span="6">Count</a-col>
      <a-col :span="6">Price</a-col>
      <a-col :span="3">Action</a-col>
    </a-row>
    <transition-group name="cart-list" tag="div">
      <a-row v-for="item in order" :key="item.id" class="list li-trans">
        <a-col :span="3">{{item.id}}</a-col>
        <a-col :span="6">{{item.name}}</a-col>
        <a-col :span="6">
          <a-icon
            type="minus-square"
            @click="changeNum(item, 'reduce')"
            :style="{color: '#02a1e9'}"
          />
          {{item.count}}
          <a-icon type="plus-square" @click="changeNum(item, 'add')" :style="{color: '#02a1e9'}" />
        </a-col>
        <a-col :span="6">{{item.price * item.count}} RMB</a-col>
        <a-col :span="3">
          <a-button type="primary" @click="del(item)">delete</a-button>
        </a-col>
      </a-row>
    </transition-group>
    <a-row class="summary">
      <a-col :span="6" :offset="12">Total count: {{total.totalCount}}</a-col>
      <a-col :span="6">Total cost: {{total.totalPrice}} RMB</a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  computed: {
    order() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.summary;
    }
  },
  methods: {
    changeNum(item, act) {
      this.$store.commit("changeCount", {
        id: item.id,
        action: act
      });
    },
    del(item) {
      this.$store.commit("deleteItem", item);
    }
  }
};
</script>
<style scoped lang="less">
@import "../assets/list.less";
.li-trans {
  transition: all 0.8s;
  width: 100%;
}
.li-trans:hover {
  background-color: #b3e6fe;
}

.cart-list-leave-active {
  position: absolute;
}

.cart-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-move {
    transition: all 1s;
}

</style>