<template>
  <div id="login-show">
    <div class="login-box">
      <h1>Login</h1>
      <div class="textbox">
        <i class="fa fa-user" aria-hidden="true"></i>
        <input type="text" id="uname" autocomplete="off" placeholder="Username" name="">
      </div>
      <div class="textbox">
        <i class="fa fa-lock" aria-hidden="true"></i>
        <input type="password" id="pwd" placeholder="Password" name="">
      </div>
      <input class="btn" type="button" @click="LoginSub" name="" value="Sign in">
    </div>
  </div>
</template>

<script>
  import {login} from "../../network/login/login";

  export default {
    name: "Login",
    data() {
      return {

      }
    },
    methods: {
      LoginSub() {
        let username = document.getElementById('uname').value;
        let password = document.getElementById('pwd').value;
        console.log(username, password);
        if (username === '' || password === '') {
          alert("请输入用户名及密码");
        } else {
          console.log(username, password);
          // login(username,password).then(res => {
          //   console.log(res);
          //   if (res === 1) {
          //     alert("登录成功");
          //     this.$store.commit('setIsLogin',true);
          //     // 改变localStorage中isLogin值
          //     window.localStorage.setItem('isLogin', 'true');
          //     this.$router.push('/bill');
          //   } else {
          //     alert("登录失败");
          //   }
          // }).catch(err => {
          //   console.log(err);
          // })
          alert("登录成功");
          this.$store.commit('setIsLogin',true);
          // 改变localStorage中isLogin值
          window.localStorage.setItem('isLogin', 'true');
          this.$router.replace('/bill');
        }
      }
    }
  }
</script>

<style scoped>
  @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
  #login-show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: no-repeat rgba(0,0,0,0.8);
    background-size: cover;
  }
  .login-box {
    width: 280px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
  }
  .login-box h1 {
    float: left;
    font-size: 40px;
    border-bottom: 6px solid #4caf50;
    margin-bottom: 50px;
    padding: 13px;
  }
  .textbox {
    width: 100%;
    overflow: hidden;
    font-size: 20px;
    padding: 8px 0;
    margin: 8px 0;
    border-bottom: 1px solid #4caf50;
  }
  .textbox i {
    width: 26px;
    float: left;
    text-align: center;
  }
  .textbox input {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    width: 120px;
    color: white;
    float: left;
    margin: 0 10px;
  }
  .btn {
    width: 100%;
    background: none;
    border: 2px solid #4caf50;
    color: white;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
    margin: 12px 0;
  }
</style>