<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>counter : {{counter}}</div>
    <div>sum : {{sumUpWithLocalData}} </div>
    <button @click="addAsync">add later</button>
  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
  name : "About",
  data() {
    return {
      num : 10
    }
  },
  methods: {
    addAsync() {
      this.$store.dispatch("incrementAsync");
    }
  },
  computed : {
    counter() {
      return this.$store.state.count;
    },
    ...mapState({
      sumUpWithLocalData(state) {
        return state.count + this.num;
      }
    })
  }
}
</script>