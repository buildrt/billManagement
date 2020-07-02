<template>
  <el-menu
    :default-active="this.$router.path"
    text-color="#5f7676"
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
    <el-menu-item index="/profile">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/passEdit">
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
        this.$store.commit('setIsLogin', false);
        // localStorage里只能存储String
        window.localStorage.setItem('isLogin', 'false');
        setTimeout(() => {
          this.$router.push('/logout');
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
    /*background-color: rgba(0,0,0,0);*/
    background-image: url("../../../assets/img/login/navbar3.png");
    box-shadow: 4px 0 1px rgba(100,100,100,.5);
    text-align: left;
    /*background-color: #e6eaed;*/
  }
  .el-menu-item i {
    margin-right: 15px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: bolder;
  }
  .el-menu-item span {
    font-weight: bolder;
  }
</style>