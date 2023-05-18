<template>
  <div>
    <!--   https://vod.gdtv.cn/m3u8/202103/161486908557.m3u8 type="application/x-mpegURL"/>-->
    <section class="wrapper" v-show="loading">
      <div class="assist" v-show="configuration.title">
        <h3 class="as-title">{{ configuration.title }}</h3>
        <div class="as-time">
          <span class="time">{{ configuration.updateTime }}</span>
        </div>
      </div>
      <div class="videoMain gdtvVideoClass" v-if="showHlsArea">
        <video ref="videoRef" controls class="video" src=""></video>
      </div>
      <div class="videoMain cutvVideoClass" v-else>
        <video class="video" controls :src="configuration.videoUrl"></video>
      </div>
    </section>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'CUTVVideo',
  data () {
    return {
      showHlsArea: true,
      configuration: {
        videoUrl: '',
        title: '',
        updateTime: Number
      },
      loading: false
      // videoUrl: 'https://vod.gdtv.cn/m3u8/202103/161486908557.m3u8',
    }
  },
  async mounted () {
    // console.log(this.$el)
    // 荔枝网的处理
    document.title = this.$route.query.title
    if (this.$route.query.from === 'gdtv') {
      const { data } = await this.$http.get('/api/gdtv/u', { params: { id: this.$route.query.url } })
      if (data.videoUrl.indexOf('.mp4') > 0) {
        this.showHlsArea = false
        this.configurationInit(data)
        this.loading = true
        return false
      }
      this.showHlsArea = true
      this.configurationInit(data)
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isAndroid || isIOS) {
        $('.gdtvVideoClass video').attr('src', data.videoUrl)
      } else {
        this.videoInit(data.videoUrl)
      }
      this.loading = true
    } else {
      // 深圳网的处理
      this.showHlsArea = false
      const { data } = await this.$http.post('/api/cutv/v', { url: this.$route.query.url })
      this.configurationInit(data)
      this.loading = true
    }
  },
  methods: {
    // 初始化播放器操作
    videoInit (videoUrl) {
      const hls = new Hls()
      hls.loadSource(videoUrl)
      hls.attachMedia(this.$refs.videoRef)
    },
    // 初始化数据操作
    configurationInit (data) {
      this.configuration.title = data.title
      this.configuration.videoUrl = data.videoUrl
      this.configuration.updateTime = data.updateTime
    }
  }
}
</script>

<style lang='less' scoped>
video {
  outline: none;
}

.wrapper {
  //display: flex;
  //flex-direction: column;
  width: 95%;
  //height: 100%;
  max-width: 1000px;
  margin: 50px auto;
  padding: 10px;
  background-color: var(--background-color);
  box-shadow: 0 0.125rem 0.925rem 0.1875rem rgba(0, 0, 0, .1);

  .assist {
    .as-title {
      font-weight: 400;
      font-size: 18px;
      color: var(--color);
    }

    .as-time {
      font-size: 14px;
      margin: 16px 0;
    }
  }
}

.videoMain {
  margin: 0 auto;
  width: 100%;
  //height: 0;
  padding: 5px;

  .video {
    width: 100%;
  }
}
</style>
