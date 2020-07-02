<template>
  <div id="menuBar">
    <div id="head">
      <p id="title">账单管理系统</p>
      <div id="clock">
        <p class="date">{{ date }}&nbsp;{{ time }}</p>
      </div>

      <div id="wel">
        <p>欢迎你：{{$store.state.loginUserName}}</p>
      </div>
    </div>
    <div id="foot">
      <p></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuBar",
    data() {
      return {
        time: '',
        date: '',
        week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      }
    },
    methods: {
      Clock() {
        let timerID = setInterval(this.updateTime, 1000);
        this.updateTime();
      },
      updateTime() {
        let cd = new Date();
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
      },
      zeroPadding(num, digit) {
        let zero = '';
        for(let i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      }
    },
    mounted() {
      this.Clock();
    }
  }
</script>

<style scoped>
  #menuBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  #head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 12%;
    /*background-image: linear-gradient(to bottom right,#12b8f0, #93b3e0);*/
    background-image: url("../../../assets/img/login/headImg1.png");
    box-shadow: 0 5px 5px rgba(100,100,100,.5);
  }
  #head #title {
    position: relative;
    margin-left: 50px;
    font-size: 36px;
    color: #434141;
    margin-top: 10px;
    font-family: 华文行楷;
    font-weight: bold;
    text-shadow: 2px 1px #696969;
  }
  #foot {
    position: absolute;
    top: 92%;
    left: 0;
    width: 100%;
    height: 8%;
    text-align: center;
    /*background-image: linear-gradient(to bottom right, #93b3e0,#12b8f0);*/
    background-image: url("../../../assets/img/login/headImg1.png");
  }
  #foot p {
    position: relative;
    font-size: 14px;
    color: white;
    top: 30%;
  }
  #clock {
    position: absolute;
    font-family: 华文新魏;
    /*color: #ffffff;*/
    text-align: left;
    left: 20%;
    top: 80%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #409eff;
    font-weight: bold;
    /*text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);*/
  }
  #clock .date {
    letter-spacing: 0.1em;
    font-size: 22px;
  }
  #wel {
    position: absolute;
    /*color: #ffffff;*/
    text-align: left;
    right: 9%;
    top: 80%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #409eff;
    font-family: 华文新魏;
    font-weight: bold;
    /*text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);*/
  }
  #wel p {
    letter-spacing: 0.1em;
    font-size: 22px;
  }
</style>