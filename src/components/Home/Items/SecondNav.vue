<template>
  <div class="main">
    <div class="showItemNum">
      <input type="text" placeholder="数量" v-model="itemNum">
      <button @click="showItemNum">确定</button>
    </div>
    <nav class="nav-main" ontouchstart="">
      <!--      <router-link to="/home/all" class="nav-item">All</router-link>-->
      <!--      <div class="all"></div>-->
      <router-link to="/home/cutv" class="nav-item">深圳台</router-link>
      <div class="cutv-content">
        <ul class="cutv-list">
          <li class="cutv-item" @click="toDetails('cutv', 'baxw', 'baoan/a/a')">宝安新闻</li>
          <li class="cutv-item" @click="toDetails('cutv', 'fgtx', 'shenzhen/b/c/d')">法观天下</li>
          <li class="cutv-item" @click="toDetails('cutv', 'zwsf', 'shenzhen/b/a/a')">正午30分</li>
          <li class="cutv-item" @click="toDetails('cutv', 'dyxc', 'shenzhen/b/c/b')">第一现场</li>
          <li class="cutv-item" @click="toDetails('cutv', 'gggc', 'shenzhen/b/f/a')">新闻广场</li>
          <li class="cutv-item" @click="toDetails('cutv', 'ybdxw', 'shenzhen/b/f/b')">18点新闻</li>
          <li class="cutv-item" @click="toDetails('cutv', 'zbsz', 'shenzhen/b/c/a')">直播深圳</li>
          <li class="cutv-item" @click="toDetails('cutv', 'szws', 'shenzhen/b/a/c')">深视新闻</li>
          <li class="cutv-item" @click="toDetails('cutv', 'dsll', 'shenzhen/b/c/c')">都市路路通</li>
          <li class="cutv-item" @click="toDetails('cutv', 'csfx', 'shenzhen/b/e/a')">城市发现</li>
          <li class="cutv-item" @click="toDetails('cutv', 'csfx', 'shenzhen/b/e/a')">1919创财经</li>
        </ul>
      </div>
      <router-link to="/home/gdtv" class="nav-item">荔枝网</router-link>
      <div class="gdtv-content">
        <ul class="gdtv-list">
          <li class="gdtv-item" @click="toDetails('gdtv', 'zjxwy', 674)">珠江新闻眼</li>
          <li class="gdtv-item" @click="toDetails('gdtv', 'dvxc', 756)">DV现场</li>
          <li class="gdtv-item" @click="toDetails('gdtv', 'jrzxw', 772)">今日最新闻</li>
          <li class="gdtv-item" @click="toDetails('gdtv', 'jrgz', 679)">今日关注</li>
          <li class="gdtv-item" @click="toDetails('gdtv', 'jryx', 770)">今日一线</li>
          <li class="gdtv-item" @click="toDetails('gdtv', 'gdxwlb', 687)">广东新闻联播</li>
        </ul>
      </div>
      <div class="animation"></div>
    </nav>
    <!--    <loading class="loadingWrapper" v-show="$store.state.showLoading"></loading>-->
  </div>
</template>

<script>
// import Loading from '@/components/Home/Loading/Loading'

export default {
  name: 'SecondNav',
  // components: { Loading },
  data () {
    return {
      itemNum: null,
      valve: true
    }
  },
  mounted () {
  },
  methods: {
    toDetails (url, name, id) {
      if (this.valve) {
        this.valve = false
        this.$router.push({
          path: `/home/${url}`,
          query: {
            tvColumn: name,
            id: id
          }
        })
        setTimeout(() => {
          this.valve = true
        }, 500)
      }
    },
    showItemNum () {
      if (this.itemNum === null) return false
      localStorage.setItem('pageSize', this.itemNum)
      location.reload()
    }
  },
  beforeDestroy () {
    this.$store.commit('changeLoading', true)
  }
}
</script>

<style lang='less' scoped>

.main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.showItemNum {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 10px;
  top: -5px;
  transition: all 0.3s;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }

  input {
    color: rgba(242, 244, 246, 1);
    text-align: center;
    margin: 0 0 5px 0;
    width: 50px;
  }

  button {
    border-radius: 3px;
    background-color: rgba(0, 77, 97, 1);
    color: #c1bbbb;
    cursor: pointer;
  }
}

.nav-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 351px;
  //width: 20%;
  transition: all .5s ease 0s;
  margin: 0 auto;
  border-radius: 2px;
  background-color: var(--nav-background-color);
  box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.2);
}

.nav-main .nav-item {
  position: relative;
  flex: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: var(--color);
  transition: all 1s ease;
}

.nav-main .animation {
  position: absolute;
  top: 0;
  left: 0;
  height: 2%;
  width: 50%;
  border-radius: 50px;
  background-color: var(--color);
  filter: invert(0%);
  transition: .2s ease-out;
}

.nav-main a:nth-of-type(1).router-link-active ~ .animation {
  left: 0;
}

.nav-main a:nth-of-type(2).router-link-active ~ .animation {
  left: 50%;
}

.nav-main a:nth-of-type(1):hover ~ .cutv-content, .cutv-content:hover {
  opacity: 1;
  animation: show .2s forwards;
}

.nav-main a:nth-of-type(2):hover ~ .gdtv-content, .gdtv-content:hover {
  opacity: 1;
  animation: show .2s forwards;
}

.nav-main .nav-item:active {
  text-decoration: none;
}

// 悬浮部分

.cutv-content, .gdtv-content {
  position: absolute;
  left: 0%;
  //left: 0;
  top: 40px;
  width: 50%;
  color: var(--color);
  background-color: var(--background-color);
  box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.2);
  transition: .2s;
  transform: scale(0);
  border-radius: 10px;
  z-index: 10;
  overflow: hidden;

  .cutv-item, .gdtv-item {
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    //margin: 10px 0;
    &:hover {
      background-color: var(--background-color);
    }
  }
}

.gdtv-content {
  left: 50%;
}

@keyframes show {
  0% {
    transform: scale(0.9);
  }
  40% {
    transform: scale(1.01);
  }
  80% {
    transform: scale(0.99);
  }
  100% {
    visibility: visible;
    transform: scale(1);
  }
}

</style>
