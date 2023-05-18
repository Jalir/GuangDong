<template>
  <div class="cell">
    <div class="loadingWrapper">{{ tips }}</div>
    <div class="card">
<!--      <span class="hexdots-loader"></span>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: ['tips']
}
</script>

<style lang='less' scoped>

.loadingWrapper {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  margin-top: 120px;
  font-size: 20px;
  //top: 20%;
}

.card {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 7px;
  height: 7px;
  z-index: 6;
}

.hexdots-loader:not(:required) {
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
  display: inline-block;
  width: 7px;
  height: 7px;
  background: transparent;
  border-radius: 100%;
  -moz-box-shadow: #666666 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
  -webkit-box-shadow: #666666 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
  box-shadow: #666666 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
  -moz-animation: hexdots-loader 5s infinite ease-in-out;
  -webkit-animation: hexdots-loader 5s infinite ease-in-out;
  animation: hexdots-loader 5s infinite ease-in-out;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}

@-moz-keyframes hexdots-loader {
  0% {
    -moz-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  8.33% {
    -moz-box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  16.67% {
    -moz-box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  25% {
    -moz-box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  33.33% {
    -moz-box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  41.67% {
    -moz-box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
  }
  50% {
    -moz-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
  }
  58.33% {
    -moz-box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
    box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
  }
  66.67% {
    -moz-box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
    box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
  }
  75% {
    -moz-box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
    box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
  }
  83.33% {
    -moz-box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
    box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
  }
  91.67% {
    -moz-box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  100% {
    -moz-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
}

@-webkit-keyframes hexdots-loader {
  0% {
    -webkit-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  8.33% {
    -webkit-box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  16.67% {
    -webkit-box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  25% {
    -webkit-box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  33.33% {
    -webkit-box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  41.67% {
    -webkit-box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
  }
  50% {
    -webkit-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
  }
  58.33% {
    -webkit-box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
    box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
  }
  66.67% {
    -webkit-box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
    box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
  }
  75% {
    -webkit-box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
    box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
  }
  83.33% {
    -webkit-box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
    box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
  }
  91.67% {
    -webkit-box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  100% {
    -webkit-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
}

@keyframes hexdots-loader {
  0% {
    -moz-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  8.33% {
    -moz-box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  16.67% {
    -moz-box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  25% {
    -moz-box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  33.33% {
    -moz-box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  41.67% {
    -moz-box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px, #999 -26px -15px 0 7px;
  }
  50% {
    -moz-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
    -webkit-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px, #999 0 -30px 0 7px;
  }
  58.33% {
    -moz-box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
    -webkit-box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
    box-shadow: #666666 26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px, #999 26px -15px 0 7px;
  }
  66.67% {
    -moz-box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
    -webkit-box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
    box-shadow: #666666 26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px, #999 26px 15px 0 7px;
  }
  75% {
    -moz-box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
    -webkit-box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
    box-shadow: #666666 0 30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px, #999 0 30px 0 7px;
  }
  83.33% {
    -moz-box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
    -webkit-box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
    box-shadow: #666666 -26px 15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px 15px 0 7px;
  }
  91.67% {
    -moz-box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 -26px -15px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
  100% {
    -moz-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    -webkit-box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
    box-shadow: #666666 0 -30px 0 7px, #999 0 -30px 0 7px, #999 26px -15px 0 7px, #999 26px 15px 0 7px, #999 0 30px 0 7px, #999 -26px 15px 0 7px, #999 -26px -15px 0 7px;
  }
}
</style>
