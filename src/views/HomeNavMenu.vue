<template>
  <div class="main">
    <header class="clearfix">
      <div class="logo">
        <a href="/">
          CASD
        </a>
      </div>
      <nav>
        <ul>
          <li class="Menu-Title">
            <span @click="showMenu">菜 单</span>
            <i class="bi bi-x" @click="showMenu"></i>
          </li>
          <li>
            <router-link to="/home" @click.native="showMenu">栏目</router-link>
          </li>
          <li>
            <router-link to="/article" @click.native="showMenu">文章</router-link>
          </li>
          <!--          <li>-->
          <!--            <router-link to="/mould" @click.native="showMenu">Mould</router-link>-->
          <!--          </li>-->
          <li>
            <router-link to="/live" @click.native="showMenu">直播</router-link>
          </li>
          <li>
            <router-link to="/advanced" @click.native="showMenu">节目</router-link>
          </li>
        </ul>
        <div class="sign-in">
          <span v-if="showUser" @click="toggleSignInDialog">登 录</span>
          <user-info v-else></user-info>
        </div>
      </nav>
      <!--      模式切换开关-->
      <swich-btn @changeThemes="changeThemes" :tap="tap"></swich-btn>
      <!--      搜索框的组件-->
      <nav-search class="nav-search"></nav-search>
      <!--      <991px后出现的三杠菜单-->
      <div class="menu-toggle" @click="showMenu"><i class="iconfont icon-caidan"></i></div>
    </header>
    <!--    登录弹出的框 -->
    <sign-in v-show="signUp"></sign-in>
  </div>
</template>

<script>
import NavSearch from '@/components/Home/nav-search-input/NavSearchInput'
import SwichBtn from '@/components/Home/ModeSwitch/SwichBtn'
import SignIn from '@/components/Home/Login/SignIn'
import UserInfo from '@/components/Home/Login/UserInfo'
import { mapState } from 'vuex'

export default {
  name: 'NavigationMenu',
  components: {
    UserInfo,
    SignIn,
    SwichBtn,
    NavSearch
  },
  data () {
    return {
      signUp: false,
      showUser: true,
      tap: true
    }
  },
  async mounted () {
    $(document).mouseup(function (e) {
      if ($(e.target).attr('class') === 'bi bi-list') {
        return false
      }
      var _con = $('nav ul') // 设置目标区域
      if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $('nav').removeClass('active')
      }
    })
    $('nav').removeClass('active')
    await this.$store.dispatch('checkLogin')
    this.checkLogin()
    if (localStorage.getItem('theme') === 'dark') $('input[type="checkbox"').attr('checked', 'checked')
  },
  methods: {
    //   检测是否登录
    async checkLogin () {
      this.showUser = !this.hasLogin
    },
    showMenu (e) {
      console.log(e)
      $('nav').toggleClass('active')
    },
    changeThemes () {
      if (this.tap) {
        this.tap = false
        this.$emit('change-theme')
        setTimeout(() => {
          this.tap = true
          this.changeTap(true)
        }, 1200)
      }
    },
    toggleSignInDialog () {
      this.signUp = !this.signUp
      this.checkLogin()
    }
  },
  computed: {
    ...mapState(['hasLogin'])
  }
}
</script>

<style lang="less" scoped>
@height: var(--nav-height);
@line-height: var(--nav-height);
@logo-font-size: 24px;
@nav-font-size: 18px;
@menu-btn-font-size: 28px;
@menu-font-size: 18px;
@menu-btn-top: 12px;
@close-iconfont-size: 36px;
@sign-in-font-size: 16px;

header {
  position: relative;
  padding: 20px 70px 20px 46px;
  box-sizing: border-box;
  background-color: var(--nav-background-color);
  box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.1);

  .logo {
    float: left;
    margin-right: 20px;
    font-weight: bold;
    height: @height;
    line-height: @line-height;
    font-size: @logo-font-size;
    vertical-align: 55px;
  }

  a {
    color: var(--color);

    &:active {
      text-decoration: none;
    }
  }
}

header nav {
  float: left;
  z-index: 99;

  ul {
    list-style: none;
    display: flex;

    .Menu-Title {
      display: none;

      span {
        cursor: pointer;
      }
    }

    a {
      height: @height;
      line-height: @line-height;
      padding: 0 20px;
      display: block;
      text-decoration: none;
      font-weight: 400;
      font-size: @nav-font-size;

      &:hover, &.router-link-active {
        color: var(--a-active-hover);
      }
    }
  }
}

header .menu-toggle {
  float: right;
  cursor: pointer;
  height: @height;
  line-height: calc(@line-height - 10px);
  display: none;

  i {
    display: block;
    margin-top: 5px;
    font-size: @menu-btn-font-size;
  }
}

header .sign-in {
  position: absolute;
  right: 0px;
  top: 50%;
  font-weight: 500;
  z-index: 10;
  width: 73px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

sign-in {
  opacity: .1;
  transition: 1s;
  animation: move .5s linear;
}

@media screen and (max-width: 991px) {
  header {
    padding: 10px 30px;

    .sign-in {
      position: absolute;
      left: 100px;
      top: 27px;
      //transition: all .2s;
    }

    .active {
      .sign-in {
        left: 176px;
      }
    }

    .menu-toggle {
      display: inline-block;
      position: absolute;
      right: 30px;
      top: @menu-btn-top;
    }

    nav {
      position: fixed;
      left: -300px;
      top: 0;
      width: 300px;
      height: 100%;
      transition: all 0.3s;

      ul {
        position: relative;
        //left: 0;
        width: 300px;
        height: 100vh;
        background-color: var(--background-color);
        box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.1);
        display: block;
        text-align: left;

        li {
          padding: 10px;
          border-bottom: 1px solid #000;

          &:nth-child(1) {
            border: none;
          }
        }

        li.Menu-Title {
          position: relative;
          display: block;
          z-index: 10;
          padding: 10px 28px;
          margin-bottom: 12px;
          text-align: left;
          height: calc(@height + 20px);
          background-color: var(--background-color);
          box-shadow: 0 0.125rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.1);

          span {
            width: 100%;
            height: @height;
            line-height: @line-height;
            font-weight: 600;
            font-size: @menu-font-size;
          }

          i {
            position: absolute;
            right: -5px;
            top: 21px;
            transform: translate(-50%, -50%);
            font-size: @close-iconfont-size;
            color: #8C8D9F;
            cursor: pointer;
            z-index: 999;

            &:hover {
              color: #5a5b75;
            }
          }
        }
      }

      &.active {
        position: fixed;
        top: 0;
        left: 0;
      }
    }
  }

}

</style>
