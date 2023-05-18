<template>
  <div class="time-picker">
    <div class="shape" @click="reduceNum">-</div>
    <div class="wrapper">
      <ul class="num-list" ref="listRef" @scroll="handleScroll">
        <li class="num-item" v-for="(item, index) in this.max" :key="index">{{ index + min }}</li>
      </ul>
    </div>
    <div class="shape" @click="addNum">+</div>
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    min: {
      default () {
        return 1
      }
    },
    max: {
      default () {
        return 23
      }
    },
    use: {
      type: String
    }
  },
  data () {
    return {
      status: false,
      timer: null,
      seletNum: 1
    }
  },
  mounted () {
    const myDate = new Date()
    let date
    switch (this.use) {
      case 'month':
        date = myDate.getMonth()
        break
      case 'day':
        date = myDate.getDate() - 1
        break
      case 'hour':
        date = myDate.getHours()
        break
      case 'minutes':
        date = myDate.getMinutes()
        break
    }
    this.seletNum = this.min
    this.$refs.listRef.scrollTo({ top: Math.ceil(date) * 25, behavior: 'smooth' })
  },
  methods: {
    handleScroll () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const cell = this.$refs.listRef.scrollTop % 25
        const num = this.$refs.listRef.scrollTop / 25
        if (cell <= Math.floor(this.max / 2) - 1 && cell !== 0) {
          this.$refs.listRef.scrollTo({ top: Math.ceil(num) * 25, behavior: 'smooth' })
        } else if (cell > Math.floor(this.max / 2)) {
          this.$refs.listRef.scrollTo({ top: Math.floor(num) * 25, behavior: 'smooth' })
        } else if (this.$refs.listRef.scrollTop === 0) {
          this.seletNum = this.min
        } else if (cell === 0 && this.$refs.listRef.scrollTop !== 0) {
          this.seletNum = this.min + num
        }
      }, 500)
    },
    reduceNum () {
      const num = this.$refs.listRef.scrollTop / 25
      if (num === 0) {
        this.seletNum = this.min
        return false
      }
      this.seletNum = this.min + num - 1
      this.$refs.listRef.scrollTo({ top: Math.ceil(num - 1) * 25, behavior: 'smooth' })
    },
    addNum () {
      const num = this.$refs.listRef.scrollTop / 25
      if (num >= this.max) {
        this.seletNum = this.max
        return false
      }
      this.seletNum = Math.floor(num) + this.min + 1
      this.$refs.listRef.scrollTo({ top: Math.ceil(num + 1) * 25, behavior: 'smooth' })
    }
  },
  watch: {
    seletNum: {
      handler (newVal) {
        // console.log(newVal)
      },
      // deep属性对对象进行深度监听
      deep: true,
      // 这样使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值        发生改变才会执行。
      // 如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。
      immediate: true
    }
  }
}
</script>

<style lang='less' scoped>
.time-picker {
  position: relative;
  top: 20px;
  display: flex;
  width: 25px;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper {
  position: relative;
  width: 25px;
  height: 100px;
}

.num-list {
  content: '';
  width: 24px;
  height: 100px;
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: default;
  user-select: none;

  &:before {
    display: block;
    content: '';
    width: 100%;
    height: 38px;
  }

  &:after {
    display: block;
    content: '';
    width: 100%;
    height: 35px;
  }

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .num-item {
    color: var(--color);
    height: 25px;

    &:before {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      background-image: linear-gradient(to bottom, rgba(var(--background-color), 0.1) 5%, rgba(150, 150, 151, 0) 18%, rgba(244, 246, 248, 0) 82%, rgba(var(--background-color), 0.1) 100%);
      opacity: 0.2;
      width: 24px;
      height: 100px;
      opacity: 1;
    }
  }
}

.shape {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  margin: 10px 0;
  user-select: none;
}
</style>
