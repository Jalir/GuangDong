<template>
  <div class="module-wrap">
    <div class="module">
      <select-wrap :defaultTag="programTag" class="box" :options="program.map(item => item.id)"
                   @getTagName="programTagFunc"></select-wrap>
      <select-wrap :defaultTag="districtTag" class="box" :options="district"
                   @getTagName="districtTagFunc"></select-wrap>
    </div>
    <div class="title"></div>
    <div class="text">
      <div class="input">
        <div class="title">
          <textarea placeholder="标题" maxlength="90" class="textarea" v-model="inputTitle"></textarea>
        </div>
        <div class="content">
          <textarea placeholder="内容" class="textarea" v-model="inputValue"></textarea>
        </div>
      </div>
      <div class="result">
        <div class="btn">
          <div class="textarea" @click="copyText">Copy</div>
          <div class="textarea" @click="deleteText">Delete</div>
        </div>
        <div class="content">
          <textarea class="textarea" v-model="ProcessedValue"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectWrap from '@/components/Mould/selectWrap'

export default {
  name: 'Mould',
  components: { SelectWrap },
  data () {
    return {
      program: [{
        id: '珠江新闻眼',
        channel: '广东珠江频道',
        time: '18:00'
      }, {
        id: 'DV现场',
        channel: '广东公共频道',
        time: '19:00'
      }, {
        id: '今日最新闻',
        channel: '南方卫视',
        time: '20:00'
      }, {
        id: '今日关注',
        channel: '广东珠江频道',
        time: '21:00'
      }, {
        id: '今日一线',
        channel: '广东TVS1频道',
        time: '21:30'
      }, {
        id: '广州新闻联播',
        channel: '广州综合频道',
        time: '22:30'
      }],
      district: ['番禺', '花都', '南沙'],
      programTag: '请选择',
      districtTag: '请选择',
      inputValue: '',
      inputTitle: '',
      ProcessedMiddleValue: ''
    }
  },
  methods: {
    programTagFunc (value) {
      this.programTag = value
    },
    districtTagFunc (value) {
      this.districtTag = value
    },
    factory (value) {
      if (this.programTag === '请选择') return null
      let text, cursor
      this.program.forEach((item, index) => {
        if (item.id === this.programTag) {
          cursor = this.program[index]
        }
      })
      const nowDay = this.$dataMoment(new Date(), 1, '-')
      const nowDayType = this.$dataMoment(new Date(), 1)
      switch (this.districtTag) {
        case '番禺':
          text = `标题《${this.inputTitle}》来源：${cursor.channel} 栏目：${cursor.id} 时长：3分5秒 时间：${nowDay} ${cursor.time}\n【内容概述】${value}\n链接：http://public.gdtv.cn/`
          break
        case '花都':
          text = `《${cursor.channel}》${cursor.id} ${this.inputTitle}。${nowDay.substr(7, 2)}日晚，${cursor.channel}（《${cursor.id}》栏目）关注一事。据报道：${value}`
          break
        case '南沙':
          text = `请审阅\n${nowDayType}\n【南沙区委宣传部】\n【敏感舆情专报】：${nowDayType}（今天）晚，${cursor.channel}《${cursor.id}》播出“${this.inputTitle}”的报道称，据${value}\n附链接：`
          break
      }
      return text
    },
    copyText () {
      this.$copyText(this.ProcessedValue)
    },
    deleteText () {
      this.inputValue = ''
      this.inputTitle = ''
      this.ProcessedMiddleValue = ''
    }
  },
  computed: {
    ProcessedValue: {
      get: function () {
        return this.factory(this.inputValue)
      },
      set: function (value) {
        return false
      }
    }
  }
}
</script>

<style lang='less' scoped>
.module {
  text-align: center;
}

textarea {
  color: var(--color);
  background-color: var(--background-color);
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .input, .result {
    display: flex;
    flex-direction: column;
    margin: 0 2px;
    width: 50%;
    height: 300px;
  }
}

.input {
  .title {

    .textarea {
      overflow-y: hidden;
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
    }
  }

  .content {
    flex: 1;

    .textarea {
      line-height: 20px;
      padding: 10px;
    }
  }
}

.result {

  .btn {
    cursor: pointer;

    .textarea {
      overflow-y: hidden;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }

  .content {
    flex: 1;

    .textarea {
      line-height: 20px;
      padding: 10px;
    }
  }
}

.textarea {
  display: inline-block;
  outline: none;
  border: 1px solid #a7a7a7;
  width: 100%;
  height: 100%;
  line-height: 100%;
  resize: none;

  &:focus {
    border: 1px solid #767676;
  }
}
</style>
