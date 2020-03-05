<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav" to="/">Home</router-link> |
      <router-link class="nav" to="/about">About</router-link> |
      <router-link class="nav" to="/contact">Contact</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
@import './assets/base.less';

.nav {
  font-size: 20px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
