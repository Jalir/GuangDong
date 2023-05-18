<template>
  <div class="home">
    <div class="main">
      <div class="showItemNum">
        <input type="text" placeholder="数量" v-model="itemNum">
        <button @click="showItemNum">确定</button>
      </div>
      <loading v-if="$store.state.showLoading" :tips="$store.state.loadingTips"></loading>
      <nav class="nav-main" ontouchstart="">
        <!--      <router-link to="/home/all" class="nav-item">All</router-link>-->
        <!--      <div class="all"></div>-->
        <router-link to="/advanced" class="nav-item">深圳台</router-link>
        <div class="cutv-content">
          <ul class="cutv-list">
            <li class="cutv-item" @click="toDetails('cutv', 'baxw', '7000')">宝安新闻</li>
            <li class="cutv-item" @click="toDetails('cutv', 'fgtx', '7885')">法观天下</li>
            <li class="cutv-item" @click="toDetails('cutv', 'zwsf', '7902')">正午30分</li>
            <li class="cutv-item" @click="toDetails('cutv', 'dyxc', '7882')">第一现场</li>
            <li class="cutv-item" @click="toDetails('cutv', 'gggc', '7924')">新闻广场</li>
            <li class="cutv-item" @click="toDetails('cutv', 'ybdxw', '7925')">18点新闻</li>
            <li class="cutv-item" @click="toDetails('cutv', 'zbsz', '7883')">直播深圳</li>
            <li class="cutv-item" @click="toDetails('cutv', 'szws', '7901')">深视新闻</li>
            <li class="cutv-item" @click="toDetails('cutv', 'dsll', '7886')">都市路路通</li>
            <li class="cutv-item" @click="toDetails('cutv', 'csfx', '7917')">城市发现</li>
            <li class="cutv-item" @click="toDetails('cutv', 'csfx', '7914')">1919创财经</li>
          </ul>
        </div>
      </nav>
      <!--    <loading class="loadingWrapper" v-show="$store.state.showLoading"></loading>-->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import SecondNav from '@/components/Home/Items/SecondNav'
import { mapState } from 'vuex'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'Home',
  components: {
    Loading
  },
  data () {
    return {
      // error: Boolean
      itemNum: null,
      valve: true
    }
  },
  mounted () {
    // console.log(2)
    this.$store.commit('changeLoading', true)
    this.$store.commit('changeLoadingTips', '请选择栏目')
  },
  methods: {
    toDetails (url, name, id) {
      if (this.valve) {
        this.$store.commit('changeLoading', true)
        this.valve = false
        this.$router.push({
          path: `/advanced/${url}`,
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
  created () {
    if (!this.hasLogin) this.$router.push({ path: '/error' })
  },
  computed: {
    ...mapState(['hasLogin'])
  },
  beforeDestroy () {
    this.$store.commit('changeLoading', true)
    this.$store.commit('changeLoadingTips', '请选择栏目')
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
  max-width: 228px;
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

.nav-main a:nth-of-type(1):hover ~ .cutv-content, .cutv-content:hover {
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
  width: 100%;
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
