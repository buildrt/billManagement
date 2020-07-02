<template>
  <div id="login-show">
    <el-carousel :interval="5000" loop height="100%" >
      <el-carousel-item v-for="item in bcImg" :key="item">
        <el-image :src="item.img" style="background-color: rgba(0,0,0,0.1);width: 100%;"></el-image>
      </el-carousel-item>
    </el-carousel>
    <transition name="el-zoom-in-bottom">
      <div class="login-box" v-show="formShow">
        <h1 style="font-family: 华文行楷">账单管理系统</h1>
        <div class="textbox">
          <i class="fa fa-user" aria-hidden="true"></i>
          <input type="text" id="uname" autocomplete="off" placeholder="Username" name="">
        </div>
        <div class="textbox">
          <i class="fa fa-lock" aria-hidden="true"></i>
          <input type="password" id="pwd" placeholder="Password" name="">
        </div>
        <el-checkbox class="rememberBtn" v-model="rememberIsClick" @click="IsRemember">Remember Me</el-checkbox >
        <input class="btn" type="button" @click="LoginSub" name="" value="Sign in">
        <div id="foot">
          <p>欢迎登录账单管理系统</p>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="confirm" v-show="confirmShow">
        <img id="rolling" src="../../assets/img/login/Rolling.gif" alt="">
        <p>正在认证中...</p>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div id="result" v-show="resultShow">
        <p>登录成功</p>
        <p style="left: 38%;">欢迎你</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import {login} from "../../network/login/login";
  import bg1 from "../../assets/img/login/loginImg1.jpg"
  import bg2 from "../../assets/img/login/loginImg2.jpg"
  import bg3 from "../../assets/img/login/loginImg3.jpg"

  export default {
    name: "Login",
    data() {
      return {
        rememberIsClick: false,
        formShow: true,
        resultShow: false,
        confirmShow: false,
        bcImg: [
          {img: bg1},
          {img: bg2},
          {img: bg3},
        ],
      }
    },
    methods: {
      LoginSub() {
        let username = document.getElementById('uname').value;
        let password = document.getElementById('pwd').value;
        console.log(username, password, this.rememberIsClick);
        if (username === '' || password === '') {
          alert("请输入用户名及密码");
        } else {
          console.log(username, password, this.rememberIsClick);
          this.formShow = false;
          this.confirmShow = true;
          setTimeout(() => {
            this.confirmShow = false;
            login(username,password,this.rememberIsClick).then(res => {
              console.log(res);
              if (res.code === 200) {
                setTimeout(() => {
                  this.resultShow = true;
                  setTimeout(() => {
                    this.$store.commit('setLoginUserName', username);
                    this.$store.commit('setLoginPassWord', password);
                    this.$store.commit('setLoginUserID', res.clientid);
                    window.localStorage.setItem('loginPassWord', password);
                    window.localStorage.setItem('loginUserName', username);
                    window.localStorage.setItem('loginUserID', res.clientid);
                    this.$store.commit('setIsLogin',true);
                    // 改变localStorage中isLogin值
                    window.localStorage.setItem('isLogin', 'true');
                    if (res.rolename === 'admin'){
                      this.$store.commit('setIsAdmin',true);
                      window.localStorage.setItem('isAdmin', 'true');
                    } else {
                      this.$store.commit('setIsAdmin',false);
                      window.localStorage.setItem('isAdmin', 'false');
                    }
                    this.$router.replace('/bill');
                  },1000);
                },300)
              } else {
                setTimeout(() => {
                  this.formShow = true;
                  this.$alert('用户名密码错误', {
                    confirmButtonText: '确定',
                  });
                },300)
              }
            }).catch(err => {
              console.log(err);
            })
            // if (1 === 1) {
            //   setTimeout(() => {
            //     this.resultShow = true;
            //     setTimeout(() => {
            //       this.$store.commit('setLoginUserName', username);
            //       this.$store.commit('setLoginPassWord', password);
            //       window.localStorage.setItem('loginPassWord', password);
            //       window.localStorage.setItem('loginUserName', username);
            //       this.$store.commit('setIsLogin',true);
            //       // 改变localStorage中isLogin值
            //       window.localStorage.setItem('isLogin', 'true');
            //       this.$store.commit('setIsAdmin', true);
            //       window.localStorage.setItem('isAdmin', 'true');
            //       this.$router.replace('/bill');
            //     },1000);
            //   },300)
            // } else {
            //   setTimeout(() => {
            //     this.formShow = true;
            //     this.$alert('用户名密码错误', {
            //       confirmButtonText: '确定',
            //     });
            //   },300)
            // }
          },1000);
        }
      },
      IsRemember() {
        this.rememberIsClick = true;
      },
    }
  }
</script>

<style>
  span.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #409EFF;
  }
  span.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
</style>
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
    border: 1px solid black;
    font-family: sans-serif;
    /*background-color: #413f3f;*/
    background-size: cover;
  }
  .el-carousel {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    filter: blur(0px);
    height: 100%;
    z-index: 1;
  }
  .login-box {
    position: absolute;
    width: 25%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    z-index: 2;
    border-radius: 5px;
    /*padding-left: 4%;*/
    background: rgba(0,0,0,0.4);
    box-shadow: -2px 2px 10px rgba(6, 17, 47, 0.7);
  }
  .login-box h1 {
    float: left;
    font-size: 40px;
    border-bottom: 6px solid #409EFF;
    margin-bottom: 50px;
    padding: 13px;
  }
  .textbox {
    position: relative;
    width: 60%;
    left: 10%;
    overflow: hidden;
    font-size: 20px;
    padding: 8px 0;
    margin: 8px 0;
    border-bottom: 2px solid #409EFF;
  }
  .rememberBtn {
    position: relative;
    width: 60%;
    left: 12%;
    color: #CFCFCF;
    overflow: hidden;
  }
  .textbox i {
    width: 26px;
    float: left;
    text-align: center;
  }
  .textbox input {
    position: absolute;
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    width: 120px;
    color: white;
    float: left;
    margin: 0 10px;
  }
  input::-webkit-input-placeholder {
    color: #CFCFCF;
  }
  .btn {
    position: absolute;
    width: 40%;
    left: 15%;
    margin-top: 50px;
    background: none;
    border: 2px solid #409EFF;
    color: white;
    padding: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  #foot {
    position: absolute;
    bottom: 18%;
    left: 15%;
    color: white;
    font-family: 华文行楷;
    font-size: 24px;
  }
  .slide-fade-enter-active {
    transition: all 2s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter{
    transform: translateX(-20px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  #confirm {
    position: absolute;
    top: 30%;
    left: 42%;
    width: 497px;
    height: 308px;
    /*padding-left: 4%;*/
    border-radius:5px;
    background: rgba(0,0,0,0.4);
    box-shadow: -2px 2px 10px rgba(6, 17, 47, 0.7);
    z-index: 2;
  }
  #confirm p {
    position: absolute;
    top: 38%;
    left: 28%;
    font-size: 34px;
    font-family: 华文行楷;
    font-weight: bolder;
    color: white;
  }
  #confirm #rolling {
    position: absolute;
    top: 10%;
    left: 8%;
    width: 60px;
  }
  #result {
    position: absolute;
    top: 8%;
    left: 36%;
    width: 28%;
    height: 85%;
    /*padding-left: 4%;*/
    background: rgba(0,0,0,0.4);
    border-radius:5px;
    box-shadow: -2px 2px 10px rgba(6, 17, 47, 0.7);
    z-index: 2;
  }
  #result p {
    position: relative;
    top: 30%;
    left: 33%;
    font-size: 34px;
    font-weight: bolder;
    font-family: 华文行楷;
    margin-bottom: 30px;
    color: white;
  }
</style>