<template>
  <div class="content">
    <div class="tabs">
      <span class="tab" @click="changeTab">
        过滤内容
      </span>
      <div class="contentBox contentFilter">
        {{
          this.$extractText(contentMessage)
        }}
      </div>
      <span class="tab" @click="changeTab">
        全部内容
      </span>
      <div class="contentBox contentAll" v-html="this.$removeVideoTag(contentMessage)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextContent',
  props: [
    'contentMessage'
  ],
  data () {
    return {}
  },
  methods: {
    changeTab (event) {
      $('.tab').removeClass('active')
      $(event.target).toggleClass('active')
    }
  }
}
</script>

<style lang='less' scoped>

.content {
  .tabs {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 24px;
    line-height: 20px;
    font-size: 14px;

    .tab {
      width: 45%;
      height: 100%;
      text-align: center;
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0);
      transition: all .2s linear;

      &.active {
        border-bottom: 1px solid var(--color);
      }

      &:hover {
        border-bottom: 1px solid var(--color);
      }
    }
  }
}

.contentBox {
  position: absolute;
  bottom: 34px;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  color: #000;
  height: 287px;
  line-height: 26px;
  overflow-y: auto;
  z-index: -1;
  opacity: 0;
  font-size: 16px;
  transform: translateX(3px);
  padding: 0 3px;
  //text-align: justify;
  transition: all 0.2s linear;
  box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.1);
  scrollbar-width: none;
}

//.contentBox::-webkit-scrollbar-thumb {
//  /*滚动条里面小方块*/
//  border-radius: 10px;
//  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//  background: #535353;
//}
//
//.contentBox::-webkit-scrollbar-track {
//  /*滚动条里面轨道*/
//  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//  border-radius: 10px;
//  background: #ededed;
//}

.active + .contentFilter,
.active + .contentAll {
  display: block;
  opacity: 1;
  z-index: 6;
  //visibility: visible;
  transform: translate(0px);
}

.contentBox::-webkit-scrollbar { /*滚动条整体样式*/
  width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
}

</style>
