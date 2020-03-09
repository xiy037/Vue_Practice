<template>
  <div id="app">
    <a-layout>
      <a-layout-header class="header"> 
        <div class="logo">VueShop</div>
        <router-link class="nav" to="/">Home | </router-link>
        <router-link class="nav" to="/cart">Cart | </router-link>
        <router-link class="nav" to="/about">About | </router-link>
        <router-link class="nav" to="/contact">Contact</router-link>
    
      </a-layout-header>

      <a-layout-content> 
           <router-view />
      </a-layout-content>  
      <a-layout-footer class="footer"> 
        copyright@2020
      </a-layout-footer>
   
    </a-layout>
  </div>
</template>

<style lang="less">
@import "./assets/base.less";


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .footer {
    background-color: #2c3e50;
    color: #42b983;
  }
  .header {
    position: relative;
    .logo {
      position: absolute;
      left: 40px;
      top: 0;
      color: white;
      font-size: 30px;
      font-style: italic;
    }
  }
}

.nav {
  font-size: 20px;
}

a {
  font-weight: bold;
  color: #2c3e50;
  .router-link-exact-active {
  color: #42b983;
}
}

</style>
