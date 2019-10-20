<template>
  <div id="menuBar">
    <div id="head">
      <div id="clock">
        <p class="date">{{ date }}&nbsp;{{ time }}</p>
      </div>
    </div>
    <div id="foot"></div>
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
  }
  #foot {
    position: absolute;
    top: 92%;
    left: 0;
    width: 100%;
    height: 8%;
  }
  #clock {
    position: absolute;
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: left;
    position: absolute;
    left: 11%;
    bottom: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }
  #clock .date {
    letter-spacing: 0.1em;
    font-size: 18px;
  }
</style>