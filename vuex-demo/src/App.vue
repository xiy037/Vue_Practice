<template>
  <div id="app">
  <a-layout>
    <a-layout-header>
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link to="/about">About</router-link>
    </a-layout-header>
    <a-layout-content class="content">
    <router-view/>
    </a-layout-content>
    <a-layout-footer>
      <div>menu@copyright</div>
    </a-layout-footer>
  </a-layout>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  height: 800px;
  width: 1000px;
  margin: auto;
  background-color: white;
}

</style>

