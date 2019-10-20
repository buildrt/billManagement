<template>
  <el-menu
    :default-active="this.$router.path"
    text-color="#000"
    router
    active-text-color="#ffd04b">
    <el-menu-item index="/bill">
      <i class="el-icon-wallet"></i>
      <span slot="title">账单管理</span>
    </el-menu-item>
    <el-menu-item index="/retailer">
      <i class="el-icon-truck"></i>
      <span slot="title">供应商管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-unlock"></i>
      <span slot="title">密码修改</span>
    </el-menu-item>
    <el-menu-item @click="Logout">
      <i class="el-icon-switch-button"></i>
      <span slot="title">退出系统</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SideBar",
    methods: {
      Logout() {
        this.$store.state.isLogin = false;
        setTimeout(() => {
          this.$router.replace('/login');
        },500);
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    position: absolute;
    top: 12%;
    width: 13%;
    height: 80%;
    background-color: rgba(0,0,0,0);
    box-shadow: 8px 0 5px rgba(100,100,100,.5);
    text-align: left;
  }
  .el-menu-item i {
    margin-right: 15px;
    margin-left: 10px;
    font-size: 20px;
  }
</style>