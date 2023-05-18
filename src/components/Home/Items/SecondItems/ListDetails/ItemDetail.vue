<template>
  <div class="home">
    <loading v-if="$store.state.showLoading" :tips="$store.state.loadingTips"></loading>
    <!--    主要内容-->
    <ul class="news-list" v-show="msg">
      <li class="news-item" v-for="(item, index) in msg" :key="index">
<!--        <div class="loading">-->
<!--          <div class="la-ball-climbing-dot la-2x">-->
<!--            <div></div>-->
<!--            <div></div>-->
<!--            <div></div>-->
<!--            <div></div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="imageArea">
          <!--          <a class="download" @click="downVideoFile(item)">下载</a>-->
          <router-link :to="{name: 'Video', query: deliverByName(item)}" target="_blank">
            <img class="item-img" data-original="" @error="errorImg">
          </router-link>
        </div>
        <div class="title">
          <a :href="item.urlLink" target="_blank" :title="item.title">{{ item.title }}</a>
        </div>
      </li>
    </ul>
    <!--    页码栏-->
    <div class="pageComponentsTest" v-show="msg.length">
      <page-component :page-config="pageConfigPageTotal" @changeCurrentPage="changePage"></page-component>
    </div>
  </div>
</template>

<script>
import PageComponent from '@/components/Home/Items/SecondItems/ListDetails/PageNumber'
import { mapState } from 'vuex'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'ShowItemModule',
  components: {
    Loading,
    PageComponent
  },
  props: ['obj'],
  data () {
    return {
      msg: '',
      maxImgHeight: Number
    }
  },
  mounted () {
    this.current = 1
    // this.$store.commit('changeLoadingTips', '请选择栏目')
    this.$store.commit('changeLoading', true)
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
    // this.getContent()
  },
  methods: {
    errorImg (e) {
      // console.log(e)
      // "this.onerror=null;this.src='https://img.zhouzh.tech/images/image-1604213190574.png'"
      // console.log(e.target)
      e.target.setAttribute('src', '/img/error.png')
      e.target.setAttribute('data-src', '/img/error.png')
    },
    deliverByName (item) {
      if (item.videoUrl) {
        return {
          url: item.id,
          from: 'gdtv',
          title: item.title
        }
      }
      return {
        url: item.urlLink,
        from: 'cutv',
        title: item.title
      }
    },
    // 改变页码时执行的函数
    changePage (page) {
      this.clearImg()
      this.pageConfigPageTotal.pageNo = page
      this.msg = this.msgLists.slice((page - 1) * this.pageConfigPageTotal.pageSize, page * this.pageConfigPageTotal.pageSize)
      this.showImg()
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    async getContent (text) {
      this.$store.commit('changeLoadingTips', '加载中')
      this.$store.commit('addDefaultConfiguration', this.obj)
      if (text) {
        await this.$store.dispatch(this.pageConfigPageTotal.getMethods, text)
      } else {
        await this.$store.dispatch(this.pageConfigPageTotal.getMethods)
      }
      if (this.msgLists.status === 401) return false
      this.msg = this.msgLists.slice(0, this.pageConfigPageTotal.pageSize)
      this.$store.commit('changeLoading', false)
      this.$nextTick(() => {
        this.showImg()
      })
    },
    defaultStatus () {
      this.$store.commit('changeLoading', true)
      this.msg = this.msgLists
    },
    // 动态加载时清空图片
    clearImg () {
      $('.item-img').each((index, item) => {
        $('.loading').eq(index).show()
        $(item).removeAttr('src')
        $(item).removeAttr('alt')
      })
    },
    // 动态加载时显示图片
    showImg () {
      this.$nextTick(() => {
        const itemList = $('.item-img')
        for (let i = 0, len = itemList.length; i < len; i++) {
          if (i < 30) {
            $('.loading').eq(i).hide()
            $(itemList[i]).attr('src', this.msg[i].imgLink)
            $(itemList[i]).attr('alt', this.msg[i].title)
          } else {
            $(itemList[i]).attr('data-src', this.msg[i].imgLink)
          }
        }
      })
    },
    async downVideoFile (item) {
      // url: item.urlLin
      // const { data } = await this.$http.post('/api/cutv/v', { url: item.urlLink })
    },
    handleScroll () {
      const windowHeight = $(window).height()
      const scrollTop = $(window).scrollTop()
      $('.item-img').each((index, item) => {
        const imageTop = $(item).offset().top
        if (imageTop - scrollTop <= windowHeight + 100) {
          $(item).attr('src', $(item).attr('data-src'))
          $('.loading').eq(index).hide()
        }
      })
    }
  },
  computed: {
    ...mapState([
      'msgLists',
      'pageConfigPageTotal'
    ])
  }
}
</script>

<style lang="less" scoped>

img[src$="break.svg"] {
  object-fit: contain;
  outline: 1px solid #ddd;
  outline-offset: -1px;
}

.news-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow-y: hidden;
  //flex-direction: row;
  transition: all .5s ease .2s;

  .news-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 351px;
    height: 230px;
    margin-bottom: 20px;
    padding: 6px;
    background-color: var(--background-color);
    transition: all .5s ease .2s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-family: "Poppins", sans-serif;

    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .imageArea {
      //position: relative;
      overflow: hidden;
      background: var(--background-color);
      width: 100%;
      height: 190px;
    }

    .download {
      position: absolute;
      left: 0;
      top: 0;
      height: 20px;
      width: 40px;
    }

    .title {
      width: 99%;
      height: 34px;
      line-height: 34px;
      text-align: center;
      //padding: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: "Poppins", sans-serif;
      font-size: 16px;

      a {
        color: var(--color);
      }
    }

    img {
      width: 100%;
      //height: 100%;
      object-fit: contain;
    }
  }
}

.pageComponentsTest {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  margin: 30px 0;
}

a:active {
  text-decoration: none;
}

.la-ball-climbing-dot,
.la-ball-climbing-dot > div {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.la-ball-climbing-dot {
  display: block;
  font-size: 0;
  color: var(--color);
  //color: white;
}

//.la-ball-climbing-dot.la-dark {
//  color: var(--color);
//}

.la-ball-climbing-dot > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.la-ball-climbing-dot {
  width: 42px;
  height: 32px;
}

.la-ball-climbing-dot > div:nth-child(1) {
  position: absolute;
  bottom: 32%;
  left: 18%;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  -webkit-transform-origin: center bottom;
  -moz-transform-origin: center bottom;
  -ms-transform-origin: center bottom;
  -o-transform-origin: center bottom;
  transform-origin: center bottom;
  -webkit-animation: ball-climbing-dot-jump .6s ease-in-out infinite;
  -moz-animation: ball-climbing-dot-jump .6s ease-in-out infinite;
  -o-animation: ball-climbing-dot-jump .6s ease-in-out infinite;
  animation: ball-climbing-dot-jump .6s ease-in-out infinite;
}

.la-ball-climbing-dot > div:not(:nth-child(1)) {
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 2px;
  border-radius: 0;
  -webkit-transform: translate(60%, 0);
  -moz-transform: translate(60%, 0);
  -ms-transform: translate(60%, 0);
  -o-transform: translate(60%, 0);
  transform: translate(60%, 0);
  -webkit-animation: ball-climbing-dot-steps 1.8s linear infinite;
  -moz-animation: ball-climbing-dot-steps 1.8s linear infinite;
  -o-animation: ball-climbing-dot-steps 1.8s linear infinite;
  animation: ball-climbing-dot-steps 1.8s linear infinite;
}

.la-ball-climbing-dot > div:not(:nth-child(1)):nth-child(2) {
  -webkit-animation-delay: 0ms;
  -moz-animation-delay: 0ms;
  -o-animation-delay: 0ms;
  animation-delay: 0ms;
}

.la-ball-climbing-dot > div:not(:nth-child(1)):nth-child(3) {
  -webkit-animation-delay: -600ms;
  -moz-animation-delay: -600ms;
  -o-animation-delay: -600ms;
  animation-delay: -600ms;
}

.la-ball-climbing-dot > div:not(:nth-child(1)):nth-child(4) {
  -webkit-animation-delay: -1200ms;
  -moz-animation-delay: -1200ms;
  -o-animation-delay: -1200ms;
  animation-delay: -1200ms;
}

.la-ball-climbing-dot.la-sm {
  width: 20px;
  height: 16px;
}

.la-ball-climbing-dot.la-sm > div:nth-child(1) {
  width: 6px;
  height: 6px;
}

.la-ball-climbing-dot.la-sm > div:not(:nth-child(1)) {
  width: 6px;
  height: 1px;
}

.la-ball-climbing-dot.la-2x {
  width: 84px;
  height: 64px;
}

.la-ball-climbing-dot.la-2x > div:nth-child(1) {
  width: 28px;
  height: 28px;
}

.la-ball-climbing-dot.la-2x > div:not(:nth-child(1)) {
  width: 28px;
  height: 4px;
}

.la-ball-climbing-dot.la-3x {
  width: 126px;
  height: 96px;
}

.la-ball-climbing-dot.la-3x > div:nth-child(1) {
  width: 42px;
  height: 42px;
}

.la-ball-climbing-dot.la-3x > div:not(:nth-child(1)) {
  width: 42px;
  height: 6px;
}

/*
 * Animations
 */
@-webkit-keyframes ball-climbing-dot-jump {
  0% {
    -webkit-transform: scale(1, .7);
    transform: scale(1, .7);
  }
  20% {
    -webkit-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  40% {
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  50% {
    bottom: 125%;
  }
  46% {
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  80% {
    -webkit-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  90% {
    -webkit-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  100% {
    -webkit-transform: scale(1, .7);
    transform: scale(1, .7);
  }
}

@-moz-keyframes ball-climbing-dot-jump {
  0% {
    -moz-transform: scale(1, .7);
    transform: scale(1, .7);
  }
  20% {
    -moz-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  40% {
    -moz-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  50% {
    bottom: 125%;
  }
  46% {
    -moz-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  80% {
    -moz-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  90% {
    -moz-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  100% {
    -moz-transform: scale(1, .7);
    transform: scale(1, .7);
  }
}

@-o-keyframes ball-climbing-dot-jump {
  0% {
    -o-transform: scale(1, .7);
    transform: scale(1, .7);
  }
  20% {
    -o-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  40% {
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  50% {
    bottom: 125%;
  }
  46% {
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  80% {
    -o-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  90% {
    -o-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  100% {
    -o-transform: scale(1, .7);
    transform: scale(1, .7);
  }
}

@keyframes ball-climbing-dot-jump {
  0% {
    -webkit-transform: scale(1, .7);
    -moz-transform: scale(1, .7);
    -o-transform: scale(1, .7);
    transform: scale(1, .7);
  }
  20% {
    -webkit-transform: scale(.7, 1.2);
    -moz-transform: scale(.7, 1.2);
    -o-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  40% {
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  50% {
    bottom: 125%;
  }
  46% {
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  80% {
    -webkit-transform: scale(.7, 1.2);
    -moz-transform: scale(.7, 1.2);
    -o-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  90% {
    -webkit-transform: scale(.7, 1.2);
    -moz-transform: scale(.7, 1.2);
    -o-transform: scale(.7, 1.2);
    transform: scale(.7, 1.2);
  }
  100% {
    -webkit-transform: scale(1, .7);
    -moz-transform: scale(1, .7);
    -o-transform: scale(1, .7);
    transform: scale(1, .7);
  }
}

@-webkit-keyframes ball-climbing-dot-steps {
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
}

@-moz-keyframes ball-climbing-dot-steps {
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
}

@-o-keyframes ball-climbing-dot-steps {
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
}

@keyframes ball-climbing-dot-steps {
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
}
</style>
