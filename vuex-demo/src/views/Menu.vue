<template>
  <div>
    Menu page
    <a-row class="row">
      <a-col :span=6>Item-Id</a-col>
      <a-col :span=6>Name</a-col>
      <a-col :span=6>Price</a-col>
      <a-col :span=6>Action</a-col>
    </a-row>
    <a-row v-for="item in menu" :key="item.id" class="list">
      <a-col :span=6>{{item.id}}</a-col>
      <a-col :span=6>{{item.name}}</a-col>
      <a-col :span=6>{{item.price}}</a-col>
      <a-col :span=6><a-button type="primary" @click="add(item)">Add</a-button></a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          id: 1,
          name: "apple",
          price: 5
        },
        {
          id: 2,
          name: "watermelon",
          price: 30
        },
        {
          id: 3,
          name: "butter",
          price: 35
        },
        {
          id: 4,
          name: "milk",
          price: 20
        }
      ]
    }
  },
  methods: {
    add(item) {
      const newItem = {...item, count : 1};
      this.$store.commit("addToCart", newItem);
    }
  }
}
</script>
<style scoped lang="less">
@import "../assets/list.less";
</style>