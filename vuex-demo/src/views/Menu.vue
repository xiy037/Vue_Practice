<template>
  <div id="menu">
    <h2>Grocery</h2>
    <div class="list-container">
    <a-row class="row">
      <a-col :span="6">Item-Id</a-col>
      <a-col :span="6">Name</a-col>
      <a-col :span="6">Price</a-col>
      <a-col :span="6">Action</a-col>
    </a-row>
    <a-row v-for="item in menu" :key="item.id" class="list">
      <a-col :span="6">{{item.id}}</a-col>
      <a-col :span="6">{{item.name}}</a-col>
      <a-col :span="6">{{item.price}}</a-col>
      <a-col :span="6">
        <a-button type="primary" @click="add(item)">Add</a-button>
      </a-col>
    </a-row>
    </div>
    <a-row class="summary">
      <a-col :span=5 :offset=18>
        <router-link to="/cart"><a-icon type="shopping-cart" :style="{color: '#0452c8', fontSize: '28px'}" />
        <span class="cart-count">{{total.totalCount}}</span></router-link>
        </a-col></a-row>
    <div class="ball-container">
    <transition @beforeEnter="bfEnter" @enter="enter" @afterEnter="afEnter" v-bind:css="false">
      <div class="ball" v-show="flag"></div>
    </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      startPosition: 0,
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
        },
        {
          id: 5,
          name: "silkMilk",
          price: 30
        },
        {
          id: 6,
          name: "coke",
          price: 5
        },
         {
          id: 7,
          name: "mtndew",
          price: 5
        },
        {
          id: 8,
          name: "banana",
          price: 10
        },
        {
          id: 9,
          name: "chestnut",
          price: 64
        }
      ]
    };
  },
  computed: {
     total() {
      return this.$store.getters.summary;
    }
  },
  methods: {
    add(item) {
      const newItem = { ...item, count: 1 };
      this.$store.commit("addToCart", newItem);
      this.flag = !this.flag;
      this.startPosition = event.target.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 50;
    },
    bfEnter(el) {
      el.style.transform = `translate(350px, ${this.startPosition}px)`;
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform="translate(830px, 780px)";
      el.style.transition = "all 0.9s ease";
      //即使用了done()，还是同步发生啊，不会等transition结束。咋回事？
      done();
    },
    afEnter() {
      setTimeout(() => {
        this.flag = !this.flag;
      }, 1000);
    }
  }
};
</script>
<style scoped lang="less">
@import "../assets/list.less";

#menu {
  position: relative;
}
.list-container {
  height: 720px;
  overflow: scroll;
}
.ball-container {
  position: absolute;
  left: 0;
  top: 0;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
}
.cart-count {
  color: red;
}
</style>