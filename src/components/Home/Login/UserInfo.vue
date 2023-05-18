<template>
  <div>
    <div class="main">
      <div class="tips">{{ username }}
        <div class="infoClass">退 出</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    if (this.hasLogin) {
      this.username = localStorage.getItem('user')
      $('.infoClass').click(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        $('.infoClass').hide()
        this.$store.dispatch('checkLogin')
        // this.$parent.checkLogin()
        window.location.reload()
      })
    }
  },
  computed: {
    ...mapState(['hasLogin'])
  }
}
</script>

<style lang='less' scoped>
.main {
  position: relative;
  //top: 0;
  //right: -30px;
  transition: all 1s;
  //overflow: hidden;
  text-align: center;
  //height: 70px;
  line-height: 70px;
  font-weight: 500;
  font-size: 16px;

  .tips {
    text-align: center;
    //display: inline-block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover .infoClass {
      position: absolute;
      display: block;
      //transition: all 1s inherit;
      animation: show .2s forwards;
    }
  }

  .infoClass {
    position: absolute;
    top: 70px;
    right: 0;
    width: 70px;
    //height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    background-color: var(--background-color);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: none;
    animation: show .5s forwards;
  }
}

@keyframes show {
  0% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  40% {
    transform: scale(1.01);
  }
  80% {
    opacity: 1;
    transform: scale(0.99);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
