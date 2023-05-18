<template>
  <div class="switch-btn clearfix">
    <label for="check-input">
      <input type="checkbox" id="check-input" @click="changeThemes" :disabled="!tap">
      <span class="btn"></span>
      <i class="iconfont icon-guanbikaiguan"></i>
    </label>
  </div>
</template>

<script>
export default {
  name: 'swich-btn',
  props: {
    tap: Boolean
  },
  methods: {
    changeThemes () {
      this.$emit('changeThemes')
    }
  }
}
</script>

<style lang='less' scoped>

.switch-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    position: absolute;
    //top: 30px;
    //right: 130px;
    top: 50%;
    right: 130px;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    cursor: pointer;

    .btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20%;
      border: none;
      opacity: 1;
      box-shadow: 0 0 4px rgba(179, 179, 179, .5),
      inset 0 0 2px rgba(104, 104, 104, 0.5),
      0 0 0 1px rgba(255, 255, 255, .5)
    }

    .iconfont {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  label input[type='checkbox']:checked {
    & ~ .iconfont {
      color: white;
    }

    & ~ .btn {
      background-color: var(--bark-background);
      color: white;
    }
  }
}

@media screen and (max-width: 991px) {
  .switch-btn {
    box-shadow: 0 0 1.5px 0.5px rgba(255, 255, 255, .9) inset;

    label {
      right: 90px;
    }
  }
}

@media screen and (max-width: 576px) {
  .switch-btn, .sign-in {
    display: none;
  }
}
</style>
