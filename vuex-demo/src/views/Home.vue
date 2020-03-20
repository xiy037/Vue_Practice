<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <h2>vueX demo part (useless info)</h2>
      <div v-text="greeting">====</div>
      <button @click="changeCount">add count</button>
      <span>{{count}}</span>
    </div>
    <div class="news">
      <h2>Breaking News:</h2>
      <div>{{carousel}}</div>
    </div>
    <div class="transition-demo">
      <button @click="showMsg = !showMsg">hide/show</button>
      <transition name="trans">
        <div v-if="showMsg" class="msg">Transition Message</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      greeting: "Hello!",
      carousel: "---最新消息：美股本周发生第四次熔断---",
      showMsg: true
    };
  },
  methods: {
    changeCount() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    }
  },
  computed: mapState(["count"]),
  mounted() {
    setInterval(() => {
      const start = this.carousel.substring(0, 1);
      const end = this.carousel.substring(1);
      this.carousel = end + start;
    }, 500);
  }
};
</script>
<style scoped>
.news {
  padding: 20px;
  background-color: #b3e6fe;
  font-size: 16px;
  color: #02a1e9;
  transition: font-size 2s, color 4s;
}
.news:hover {
  font-size: 20px;
  color: black;
}
.transition-demo {
  height: 100px;
  margin: 20px 0;
  font-size: 20px;
  background-color: #57c192;
  font-weight: 500;
}
.msg {
  color: green;
}
.trans-enter,
.trans-leave-to {
  opacity: 0;
}

.trans-enter-active,
.trans-leave-active {
  transition: all 0.8s ease;
}

</style>