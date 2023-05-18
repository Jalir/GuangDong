<template>
  <div>
    <div class="liveSource"><p ref="answer" class="answer" @click="$copyText($event.target.innerText)"></p></div>
    <div class="wrapper">
      <div class="videoMain">
        <video id="video" ref="videoRef" class="video video-js vjs-default-skin vjs-big-play-centered" controls
               preload="none" playsinline="true">
        </video>
      </div>
    </div>
    <div class="playback_wrapper">
      <span class="playback" @click="setReplayTime('fgtx')">法观天下</span>
      <span class="playback" @click="setReplayTime('zwhf')">正午30分</span>
      <span class="playback" @click="setReplayTime('zbsz')">直播深圳</span>
      <span class="playback" @click="setReplayTime('dsllt')">都市路通</span>
      <span class="playback" @click="setReplayTime('18news')">18点新闻</span>
      <span class="playback" @click="setReplayTime('dyxc')">第一现场</span>
      <span class="playback" @click="setReplayTime('ssxw')">深视新闻</span>
      <span class="playback" @click="setReplayTime('xwgc')">新闻广场</span>
      <span class="playback" @click="setReplayTime('csfx')">城市发现</span>
      <span class="playback" @click="setReplayTime('1919ccj')">19创财经</span>
    </div>
    <div class="selectMain">
      <input type="radio" id="live" name="tvChannel" checked>
      <input type="radio" id="replay" name="tvChannel">
      <div class="tagMain">
        <label for="live" class="tag live">live</label>
        <label for="replay" class="tag replay">replay</label>
      </div>
      <div class="boxContain">
        <div class="boxItem liveContain">
          <!--          <live-menu @handleChannel="handleChannel" :options="cctvChannel" :title="'中央台'"></live-menu>-->
          <live-menu @handleChannel="handleChannel" :options="gdtvChannel" :title="'广东台'"></live-menu>
          <live-menu @handleChannel="handleChannel" :options="cutvChannel" :title="'深圳台'"></live-menu>
        </div>
        <div class="boxItem replayContain">
          <form>
            <input type="radio" name="cutv" id="cutv1" value="深圳卫视" v-model="picked">
            <label class="radioLabel" for="cutv1">深圳卫视</label>
            <input type="radio" name="cutv" id="cutv2" value="都市频道" v-model="picked">
            <label class="radioLabel" for="cutv2">都市频道</label>
            <input type="radio" name="cutv" id="cutv3" value="公共频道" v-model="picked">
            <label class="radioLabel" for="cutv3">公共频道</label>
            <input type="radio" name="cutv" id="cutv4" value="财经生活" v-model="picked">
            <label class="radioLabel" for="cutv4">财经生活</label>
            <input type="radio" name="cutv" id="cutv5" value="娱乐频道" v-model="picked">
            <label class="radioLabel" for="cutv5">娱乐频道</label>
          </form>
          <div class="replayTimeSetting">
            <input type="text" @input="inputBegin" class="timestamp" ref="inputBeginRef">
            <input type="text" @input="inputEnd" class="timestamp" ref="inputEndRef">
          </div>
          <!--          <time-picker ref="monthRef" :min="1" :max="12" :use="'month'"></time-picker>-->
          <!--          <time-picker ref="dayRef" :min="1" :max="31" :use="'day'"></time-picker>-->
          <!--          <time-picker ref="minRef" :min="0" :max="60" :use="'hour'"></time-picker>-->
          <!--          <time-picker ref="secondRefs" :min="0" :max="60" :use="'minutes'"></time-picker>-->
          <div class="play" @click="playVideo">Play！</div>
          <div class="liveSource"><p ref="answer" class="answer" @click="$copyText($event.target.innerText)"></p></div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--<link href="https://vjs.zencdn.net/7.17.0/video-js.css" rel="stylesheet" />-->
<!--<script src="https://vjs.zencdn.net/7.17.0/video.min.js"></script>-->
<script>
import Hls from 'hls.js'
import LiveMenu from '@/components/Live/LiveMenu'

export default {
  name: 'LiveModule',
  components: { LiveMenu },
  data () {
    return {
      videoUrl: '',
      videoOptions: {
        id: 'szse',
        start: 1619496736000,
        end: 1619497816000
      },
      cctvChannel: ['CCTV1', 'CCTV2', 'CCTV3', 'CCTV4', 'CCTV5', 'CCTV6', 'CCTV7', 'CCTV8', 'CCTV9', 'CCTV10', 'CCTV11'],
      gdtvChannel: ['广东卫视', '广东珠江', '广东新闻', '广东公共', '广东体育', '南方卫视', '经济科教', '广东影视', '广东综艺', '广东国际', '广东少儿', '交通之声', '南方购物', '嘉佳卡通', '城市之声', '文体广播', '广东房产', '现代教育', '南方生活广播', 'GRTN文化频道'],
      cutvChannel: ['深圳卫视', '都市频道', '公共频道', '财经生活', '少儿频道', '电视剧场', '娱乐频道', '深圳国际', '深圳移动', 'DV生活', '体育健康'],
      channel: null,
      picked: ''
    }
  },
  async mounted () {
    // 防止eslint检测到下一行
    // eslint-disable-next-line no-undef
    this.myPlayer = videojs(this.$refs.videoRef, {
      // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      controls: true,
      // 自动播放属性,muted:静音播放
      autoplay: true,
      // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      preload: 'auto',
      // fluid: true,
      volumeMenuButton: true,
      poster: 'https://picsum.photos/1920/1080', // 封面图片
      controlBar: {
        volumePanel: {
          inline: false
        }
      }
    })
    this.$refs.inputBeginRef.value = new Date().getFullYear() + '-' + this.$dataMoment().replace(' ', ' / ')
    this.$refs.inputEndRef.value = new Date().getFullYear() + '-' + this.$dataMoment().replace(' ', ' / ')
    // console.log(this.$refs.inputBeginRef.value)
    // console.log(this.$dataMoment())
    // console.log('2021-' + this.$dataMoment())
    // console.log(new Date('2021-' + this.$dataMoment()).getTime())
    const { data: { channelList: gdtv } } = await this.$http.get('/api/gdtv/a')
    const { data: { channelList: cutv } } = await this.$http.get('/api/cutv/a')
    this.channel = Object.assign(gdtv, cutv)
    // this.videoUrl = data.live
    // this.configurationInit()
  },
  methods: {
    // test (e) {
    //   console.log(e.target.innerText)
    // },
    // https://vod.gdtv.cn/m3u8/202104/161935379525.m3u8
    // 初始化播放器操作
    videoInit (videoUrl) {
      const hls = new Hls()
      hls.loadSource(videoUrl)
      hls.attachMedia(this.$refs.videoRef)
    },
    // 初始化数据操作
    configurationInit () {
      // this.videoInit(this.videoUrl)
    },
    // 获取时间戳
    giveData () {
      return new Date(`${new Date().getFullYear()}/${this.$refs.monthRef.seletNum}/${this.$refs.dayRef.seletNum} ${this.$refs.minRef.seletNum}:${this.$refs.secondRefs.seletNum}:00`).getTime()
    },
    handleChannel (ID) {
      // this.videoUrl = this.channel[ID]
      this.myPlayer.src(this.channel[ID])
      // console.log(this.channel)
      this.$copyText(this.channel[ID])
      this.configurationInit()
      this.myPlayer.enterFullScreen()
      this.myPlayer.supportsFullScreen()
    },
    inputBegin (e) {
      this.videoOptions.start = new Date(e.currentTarget.value).getTime()
    },
    inputEnd (e) {
      this.videoOptions.end = new Date(e.currentTarget.value).getTime()
    },
    async playVideo () {
      this.videoOptions.id = this.picked
      const { data } = await this.$http.get('/api/cutv/m', { params: this.videoOptions })
      // this.videoUrl = data.replay
      this.myPlayer.src(data.replay)
      this.$copyText(data.replay)
      this.configurationInit()
      this.$refs.answer.innerHTML = new Date(`${this.$dataMoment(undefined, '1', '1')} 20:00:00`.replace(/-/g, '/')).getTime()
    },
    setReplayTime (programs) {
      // videoOptions: {
      //   id: 'szse',
      //     start: 1619496736000,
      //     end: 1619497816000
      // }
      switch (programs) {
        case 'fgtx':
          this.picked = '都市频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 11:55:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 12:30:00`.replace(/-/g, '/')).getTime()
          break
        case 'zwhf':
          this.picked = '深圳卫视'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 11:50:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 12:42:00`.replace(/-/g, '/')).getTime()
          break
        case 'zbsz':
          this.picked = '都市频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 20:40:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 21:00:00`.replace(/-/g, '/')).getTime()
          break
        case 'dsllt':
          this.picked = '都市频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 17:30:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 18:20:00`.replace(/-/g, '/')).getTime()
          break
        case '18news':
          this.picked = '公共频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 17:57:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 18:36:00`.replace(/-/g, '/')).getTime()
          break
        case 'dyxc':
          this.picked = '都市频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 18:20:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 19:52:00`.replace(/-/g, '/')).getTime()
          break
        case 'ssxw':
          this.picked = '深圳卫视'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 18:30:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 19:00:00`.replace(/-/g, '/')).getTime()
          break
        case 'xwgc':
          this.picked = '公共频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 21:45:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 22:37:00`.replace(/-/g, '/')).getTime()
          break
        case 'csfx':
          this.picked = '娱乐频道'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 19:50:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 20:45:00`.replace(/-/g, '/')).getTime()
          break
        case '1919ccj':
          this.picked = '财经生活'
          this.videoOptions.start = new Date(`${this.$dataMoment(undefined, '1', '1')} 19:19:00`.replace(/-/g, '/')).getTime()
          this.videoOptions.end = new Date(`${this.$dataMoment(undefined, '1', '1')} 20:00:00`.replace(/-/g, '/')).getTime()
          break
        default:
          return
      }
      this.playVideo()
    }
  }
}
</script>

<style lang='less' scoped>
.wrapper {
  width: 89%;
  max-width: 880px;
  margin: 30px auto 30px auto;
  padding: 0 4px;
  background-color: var(--background-color);
  box-shadow: 0 0.125rem 0.925rem 0.1875rem rgba(0, 0, 0, .1);
}

.videoMain {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;

  .video {
    width: 100%;
    height: 100%;
  }
}

.selectMain {
  margin-top: 10px;

  .tagMain {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 10px 0;

    .tag {
      display: inline-block;
      width: 120px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      background-color: var(--background-color);
      color: var(--color);

      &:nth-child(1) {
        border-left: 1px solid var(--color);
      }

      &:nth-child(2) {
        border-right: 1px solid var(--color);
      }
    }

    &:before {
      content: '';
      position: absolute;
      transform: translateX(-100%);
      bottom: 0;
      left: 50%;
      height: 2%;
      width: 120px;
      background-color: var(--color);
      transition: .2s ease-out;
    }
  }
}

.selectMain .boxContain {
  width: 200vw;
  transition: all 0.3s ease-out;
  transform: translateX(0);

  .boxItem {
    vertical-align: top;
    display: inline-block;
    width: 100vw;
  }
}

.replayContain {
  text-align: center;

  form {
    margin-top: 22px;
    //max-width: 520px;
    //flex-wrap: wrap;
    //align-items: center;
    //justify-content: space-around;
  }

  .replayTimeSetting {
    width: 100%;

    .timestamp {
      margin: 10px;
      text-align: center;
      padding: 8px 8px;
      color: var(--color);
      border: 1px solid var(--color);
      border-radius: 5px;
    }
  }

  .play {
    margin: 10px auto;
    display: block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #e8e8e8;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.5s;

    &:hover {
      box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.2);
    }
  }

  .radioLabel {
    cursor: pointer;
    margin: 0 4px;

    &:before {
      content: "";
      vertical-align: -4px;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin: 0 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .liveSource {
    width: 100%;
    margin-top: 30px;
    padding: 0 10px;
    word-break: break-word;

    .answer {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

input[name="cutv"]:checked + .radioLabel:before {
  border: 1px solid rgb(229, 213, 213);
  outline: none;
  background-color: rgba(229, 229, 229, 1);
}

input[id="live"]:checked ~ .tagMain:before {
  transform: translateX(-100%);
}

input[id="replay"]:checked ~ .tagMain:before {
  transform: translateX(0);
}

input[id="live"]:checked ~ .boxContain {
  transform: translateX(0);
}

input[id="replay"]:checked ~ .boxContain {
  transform: translateX(-50%);
}

input[name="tvChannel"], input[name="cutv"] {
  display: none;
}

@media screen and (max-width: 991px) {
  .wrapper {
    width: 89%;
    max-width: 880px;
    height: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .videoMain {
    width: 100%;
    height: 100%;

    .video {
      width: 100%;
      height: 100%;
    }
  }
}

.playback_wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;

  .playback {
    border: 1px solid var(--color);
    padding: 5px 10px;
    margin: 2px;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>
