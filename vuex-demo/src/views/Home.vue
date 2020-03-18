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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Home",
  data() {
    return {
      greeting: "Hello!",
      carousel: "---最新消息：美股本周发生第三次熔断---",
    };
  },
  methods: {
    changeCount() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    }
  },
  computed: mapState(['count']),
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
}
</style>