<template>
  <div id="app">
    <menu-bar v-if="this.$store.state.isLogin"></menu-bar>
    <side-bar v-if="this.$store.state.isLogin"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import SideBar from './components/content/sideBar/SideBar'
  import MenuBar from './components/content/menuBar/MenuBar'
  import Login from './views/login/Login'
  export default {
    name: 'app',
    components: {
      SideBar,
      MenuBar,
      Login
    },
    data() {
      return {

      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background: #0f3854;*/
    /*background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);*/
    /*background-size: 100%;*/
  }
</style>
