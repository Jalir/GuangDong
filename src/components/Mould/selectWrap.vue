<template>
    <div class="select-wrap">
        <div class="select">{{ defaultTag }}</div>
        <div class="options">
            <div @click="selectTag" class="value" v-for="(item, index) in options" :key="index">{{ item }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'selectWrap',
  props: ['options', 'defaultTag'],
  data () {
    return {}
  },
  methods: {
    selectTag (e) {
      // console.log(e.target.innerText)
      this.$emit('getTagName', e.target.innerText)
      $('.options').css({ transform: 'scaleY(0)' })
    }
  }
}
</script>

<style lang='less' scoped>

.select-wrap {
  position: relative;
  display: inline-block;
  //justify-content: center;
  //align-items: center;
  width: 40%;
  max-width: 260px;
  margin: 20px 16px;
}

.select {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.125rem 0.225rem -0.1875rem rgba(0, 0, 0, 0.2);
  max-width: 351px;
  height: 40px;
  cursor: pointer;
  border: 1px solid var(--color);
  border-radius: 2px;
}

.select-wrap:hover .options, .options:hover {
  animation: enter .3s forwards;
}

.options {
  position: absolute;
  left: 0;
  top: 40px;;
  width: 100%;
  max-width: 351px;
  padding-top: 2px;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.225rem -0.1875rem rgba(0, 0, 0, 0.2);
  border-radius: 15%;
  //animation: enter .2s forwards;
  transform-origin: top;
  transform: scaleY(0);

  .value {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    color: var(--color);
    background-color: var(--background-color);
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.1s ease-in-out;
  }
}

.value:hover {
  color: var(--text-background);
  background-color: #d2c7c7;
}

@keyframes enter {
  0% {
    opacity: 0;
    transform: scaleY(0.4);
  }
  //10% {
  //  transform: scaleY(0.9);
  //}
  //30% {
  //  transform: scaleY(1.11);
  //}
  //50% {
  //  opacity: 1;
  //  transform: scaleY(0.96);
  //}

  100% {
    transform: scaleY(1);
  }
}

@keyframes sheen {
  0% {
    transform: skewY(-45deg) translateX(0);
  }
  100% {
    transform: skewY(-45deg) translateX(12.5em);
  }
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
