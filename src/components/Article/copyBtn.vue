<template>
  <div>
    <div class="generate">
      <span class="growUp" @click="copyFunc">生 成</span>
      <span class="clearAll" @click="clearFunc">清 空</span>
      <div class="preview">{{ generate }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'copyBtn',
  props: ['newIds'],
  methods: {
    copyFunc () {
      this.$copyText(`${this.generateTemplate(this.newIds)}`)
      // this.$emit('clearAll')
    },
    clearFunc () {
      this.$emit('clearAll')
    },
    generateTemplate (newIds) {
      const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const time = new Date()
      const timeDate = this.$dataMoment(time.getTime(), 1)
      const day = weekday[time.getDay()]
      const length = newIds.length
      let content = `今天（${timeDate}，${day}），广东新闻联播新增涉穗报道${length}条。`

      if (length > 0) {
        newIds.forEach((item, index) => {
          content = `${content}\n${index + 1}、${
            this.GdNewsItemList.data[item].title
          }\n${this.GdNewsItemList.data[item].url}`
        })
      }
      return content
    }
  },
  computed: {
    ...mapState(['GdNewsItemList']),
    generate () {
      return this.generateTemplate(this.newIds)
    }
  }
}
</script>

<style lang='less' scoped>

.generate {
  position: fixed;
  right: 20px;
  bottom: 20px;
  border-radius: 5px;
  z-index: 6;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  .growUp {
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
    opacity: 0.2;
    border: 1px solid rgba(0, 0, 0, 0);
    color: var(--color);
    transition: all 0.3s ease-in-out;
    &:hover ~ .clearAll {
      //opacity: 1;
      transform: translateX(0px);
    }
  }
  &:hover {

    .growUp {
      opacity: 1;
      border: 1px solid var(--color);
      //border: 1px solid var(--color);
    }
  }

}

.clearAll {
  position: absolute;
  left: -100%;
  top: 0;
  //width: 100%;
  //height: 100%;
  opacity: 0;
  display: inline-block;
  width: 50px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  opacity: 0.2;
  //display: none;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  transform: translateY(50px);

  &:hover {
    transform: translateX(0px);
    display: block;
    opacity: 1;
    border: 1px solid var(--color);
  }
}

.preview {
  position: absolute;
  right: 0;
  bottom: 40px;
  width: 80vw;
  max-width: 500px;
  text-align: justify;
  border-radius: 5px;
  line-height: 26px;
  font-size: 14px;
  padding: 10px;
  opacity: 0;
  visibility: hidden;
  white-space: pre-wrap;
  word-break: break-all;
  background-color: var(--background-color);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transform: translateX(-4px);
  transition: all 0.2s ease-in-out;
}

.generate:hover .preview {
  visibility: visible;
  transform: translateX(0);
  opacity: 1;
}
</style>
