<template>
  <div>
    <loading v-if="showLoading" :tips="'载入中...'"></loading>
    <div class="container" @click.self="clearShowText">
      <section class="singleItem" v-for="(item, index) in GdNewsItemList.data" :key="index">
        <div class="img"><img :src="item['imgUrl']" alt=""></div>
        <div class="textArea clearfix">
          <div class="title">{{ item.title }}</div>
          <div class="copyBtn"><span @click="copyTextContent(index)">Copy</span></div>
          <div class="select">
            <span class="checkBox" :key="index" @click="selectItem($event, index)"></span>
          </div>
          <div class="time">{{ item.updateTime }}</div>
        </div>
        <div class="tags">
          <ul>
            <li v-for="(tag, index) in item['hasTagArr']" :key="index">{{ tag.name }}</li>
          </ul>
        </div>
        <text-content :contentMessage="item.content"></text-content>
      </section>
    </div>
    <copy-btn :newIds="newIds" @clearAll="clearAll"></copy-btn>
  </div>
</template>

<script>
import TextContent from '@/components/Article/TextContent'
import { mapState } from 'vuex'
import CopyBtn from '@/components/Article/copyBtn'
import Loading from '@/components/Loading/Loading'

export default {
  components: {
    Loading,
    CopyBtn,
    TextContent
  },
  async created () {
    if (!this.hasLogin) {
      this.$router.push({ path: '/error' })
    } else {
      await this.$store.dispatch('getGdNews')
      // console.log('up2')
      this.showLoading = false
    }
  },
  data () {
    return {
      newIds: [],
      showLoading: true
    }
  },
  methods: {
    clearAll () {
      this.newIds = []
      $('.checkBox').removeClass('selected')
    },
    clearShowText () {
      $('.tab').removeClass('active')
    },
    selectItem (e, key) {
      const index = this.newIds.indexOf(key)
      if (index > -1) {
        this.newIds.splice(index, 1)
      } else {
        this.newIds.push(key)
      }
      // console.log($(e.target).find('.checkBox'))
      $(e.target).find('.checkBox').toggleClass('selected')
      $(e.target).toggleClass('selected')
    },
    copyTextContent (index) {
      const item = this.GdNewsItemList.data[index]
      this.$copyText(`${this.$dataMoment(item.timestamp, 1)}，广东卫视频道《广东新闻联播》栏目《${item.title}》，报道了${this.$extractText(item.content)}\n链接：${item.url}`)
    }
  },
  computed: {
    ...mapState(['GdNewsItemList', 'hasLogin'])
  }
}
</script>

<style lang='less' scoped>
@height: 20px;

.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  //flex-direction: row;
  transition: all .5s ease .2s;
  font-size: 18x;
  padding-bottom: 50px;
}

.singleItem {
  margin: 10px;
  width: 300px;
  //height: 400px;
  //border: 1px solid black;
  box-shadow: 0 0rem 1.625rem 0.0875rem rgba(0, 0, 0, 0.1);
  background-color: var(--background-color);
  padding: 8px;
  font-size: 18px;
  border-radius: 2px;
  transform: translateY(2px);
  transition: all 0.2s linear;
  border: 2px solid var(--background-color);

  &:hover {
    //transform: translateY(00px);
    border: 2px solid var(--border-color);
    //border: 1px solid rgba(0,0,0,.5);
    //border-color: var(--border-color)
  }

  .img, .video {
    width: 300px;
    height: 200px;
    width: 100%;
    overflow: hidden;
    text-align: center;

    img, video {
      width: 98%;
    }
  }

  .textArea {
    cursor: default;
    line-height: @height;

    .title {
      user-selet: none;
      font-size: 16px;
      width: 100%;
      height: 30px;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
      margin: 3px 0;
    }

    .time {
      //line-height: 20px;
      font-size: 12px;
    }

    .copyBtn {
      cursor: pointer;
      float: right;
      font-size: 12px;
      //line-height: 20px;
    }

    .select {
      .checkBox {
        cursor: pointer;
        float: right;
        margin: 3px 10px;
        width: 16px;
        height: 16px;
        display: inline-block;
        border: 1px solid var(--color);
      }

      .selected {
        background-color: var(--color);
      }
    }
  }

  .tags {
    cursor: default;
    margin: 10px 0;
    overflow: hidden;
    height: @height;
    line-height: @height;

    ul {
      li {
        float: left;
        border-radius: 1px;
        margin-right: 3px;
        text-align: center;
        min-width: 38px;
        height: @height;
        line-height: @height;
        font-size: 14px;
        color: var(--color);
        border-bottom: 1px solid var(--color);
      }
    }
  }

}

</style>
