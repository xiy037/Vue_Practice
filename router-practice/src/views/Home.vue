<template>
  <div class="home">
    <a-layout class="content">
      <a-layout-sider width="200" class="sider">
        <div class="sub-menu">Categories</div>
        <a-menu>
          <a-sub-menu key="clothes">
            <span slot="title">Clothes</span>
            <a-menu-item key="1">
              <router-link to="clothes">All</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="women-clothes">Women</router-link>
            </a-menu-item>
            <a-menu-item key="3">Men</a-menu-item>
            <a-menu-item key="4">Children</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="pants">
            <span slot="title">Pants</span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="shoes">
            <span slot="title">Shoes</span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="decorations">
            <span slot="title">Decorations</span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        content
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
<style scoped>
.sider {
  font-weight: 800;
  background-color: white;
}
.content {
  min-height: 600px;
}

.sub-menu {
  margin: 30px;
  font-size: 20px;
}
</style>
